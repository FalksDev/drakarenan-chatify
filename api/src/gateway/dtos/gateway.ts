import { Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IFriendService } from "src/friend/interfaces/friend";
import { ServerEvents, Services, WebsocketEvents } from "src/utils/constants";
import { IGatewaySessionManager } from "./gateway.session";
import { Server } from 'socket.io';
import { AuthenticatedSocket } from "./interfaces/AuthenticatedSocket";
import { OnEvent } from "@nestjs/event-emitter";
import { FriendRequest } from "src/utils/typeorm";
import { AcceptFriendRequestResponse } from "src/utils/types";

@WebSocketGateway({
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
  })
  export class MessagingGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(
      @Inject(Services.GATEWAY_SESSION_MANAGER)
      readonly sessions: IGatewaySessionManager,
      @Inject(Services.FRIEND)
      private readonly friendsService: IFriendService,
    ) {}
  
    @WebSocketServer()
    server: Server;
  
    handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
      console.log('Incoming Connection');
      this.sessions.setUserSocket(socket.user.id, socket);
      socket.emit('connected', {});
    }
  
    handleDisconnect(socket: AuthenticatedSocket) {
      console.log('handleDisconnect');
      console.log(`${socket.user.username} disconnected.`);
      this.sessions.removeUserSocket(socket.user.id);
    }
  
    @SubscribeMessage(WebsocketEvents.GET_ONLINE_FRIENDS)
    async handleFriendListRetrieve(
      @MessageBody() data: any,
      @ConnectedSocket() socket: AuthenticatedSocket,
    ) {
      const { user } = socket;
      if (user) {
        console.log('user is authenticated');
        console.log(`fetching ${user.username}'s friends`);
        const friends = await this.friendsService.getFriends(user.id);
        const onlineFriends = friends.filter((friend) =>
          this.sessions.getUserSocket(
            user.id === friend.receiver.id
              ? friend.sender.id
              : friend.receiver.id,
          ),
        );
        socket.emit(WebsocketEvents.GET_ONLINE_FRIENDS, onlineFriends);
      }
    }

    @OnEvent(ServerEvents.FRIEND_REQUEST_CREATED)
    friendRequestCreate(payload: FriendRequest) {
      console.log(ServerEvents.FRIEND_REQUEST_CREATED, payload);
      const receiverSocket = this.sessions.getUserSocket(
        payload.receiver.id,
      );
      receiverSocket && receiverSocket.emit(WebsocketEvents.FRIEND_REQUEST_RECEIVED, payload);
    }
  
    @OnEvent(ServerEvents.FRIEND_REQUEST_CANCELLED)
    handleFriendRequestCancel(payload: FriendRequest) {
      console.log(ServerEvents.FRIEND_REQUEST_CANCELLED);
      const receiverSocket = this.sessions.getUserSocket(
        payload.receiver.id,
      );
      receiverSocket && receiverSocket.emit(WebsocketEvents.FRIEND_REQUEST_CANCELLED, payload);
    }
  
    @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
    handleFriendRequestAccepted(payload: AcceptFriendRequestResponse) {
      console.log(ServerEvents.FRIEND_REQUEST_ACCEPTED);
      const senderSocket = this.sessions.getUserSocket(
        payload.friendRequest.sender.id,
      );
      senderSocket &&
        senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
    }
  
    @OnEvent(ServerEvents.FRIEND_REQUEST_REJECTED)
    handleFriendRequestRejected(payload: FriendRequest) {
      console.log(ServerEvents.FRIEND_REQUEST_REJECTED);
      const senderSocket = this.sessions.getUserSocket(payload.sender.id);
      senderSocket &&
        senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_REJECTED, payload);
    }
  }