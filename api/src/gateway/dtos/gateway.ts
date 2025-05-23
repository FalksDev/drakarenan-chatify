import { Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IFriendService } from "../../friend/interfaces/friend";
import { ServerEvents, Services, WebsocketEvents } from "../../utils/constants";
import { IGatewaySessionManager } from "./gateway.session";
import { Server } from 'socket.io';
import { AuthenticatedSocket } from "./interfaces/AuthenticatedSocket";
import { OnEvent } from "@nestjs/event-emitter";
import { FriendRequest } from "../../utils/typeorm";
import { AcceptFriendRequestResponse, AddGroupUserResponse, CreateGroupMessageResponse, CreateMessageResponse, RemoveGroupUserResponse } from "../../utils/types";
import { Conversation } from "../../utils/typeorm/entities/Conversation";
import { Group } from "../../utils/typeorm/entities/Group";
import { GroupMessage } from "../../utils/typeorm/entities/GroupMessage";
import { Message } from "../../utils/typeorm/entities/Message";
import { IGroupService } from "../../group/interfaces/group";
import { IConversationService } from "../../conversation/interfaces/conversation";

@WebSocketGateway({
    cors: {
      allowedHeaders: ['content-type'],
      origin: 'https://drakarenan-chatify.vercel.app',
      credentials: true,
      methods: ["GET", "POST"]
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
      @Inject(Services.CONVERSATION)
      private readonly conversationService: IConversationService,
      @Inject(Services.GROUP)
      private readonly groupsService: IGroupService,
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

    @SubscribeMessage('getOnlineGroupUsers')
    async handleGetOnlineGroupUsers(
      @MessageBody() data: any,
      @ConnectedSocket() socket: AuthenticatedSocket,
    ) {
      const group = await this.groupsService.findGroupById(
        parseInt(data.groupId),
      );
      if (!group) return;
      const onlineUsers = [];
      const offlineUsers = [];
      group.users.forEach((user) => {
        const socket = this.sessions.getUserSocket(user.id);
        socket ? onlineUsers.push(user) : offlineUsers.push(user);
      });
      socket.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
    }

    @SubscribeMessage('createMessage')
    handleCreateMessage(@MessageBody() data: any) {
      console.log('Create Message');
    }

    @SubscribeMessage('onConversationJoin')
    onConversationJoin(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log(
        `${client.user?.id} joined a Conversation of ID: ${data.conversationId}`,
      );
      client.join(`conversation-${data.conversationId}`);
      console.log(client.rooms);
      client.to(`conversation-${data.conversationId}`).emit('userJoin');
    }

    @SubscribeMessage('onConversationLeave')
    onConversationLeave(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log('onConversationLeave');
      client.leave(`conversation-${data.conversationId}`);
      console.log(client.rooms);
      client.to(`conversation-${data.conversationId}`).emit('userLeave');

      //INFO: We also need to stop the typing-status if the user leaves.
      client.to(`conversation-${data.conversationId}`).emit('onTypingStop');
    }

    @SubscribeMessage('onGroupJoin')
    onGroupJoin(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log('onGroupJoin');
      client.join(`group-${data.groupId}`);
      console.log(client.rooms);
      client.to(`group-${data.groupId}`).emit('userGroupJoin');
    }

    @SubscribeMessage('onGroupLeave')
    onGroupLeave(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log('onGroupLeave');
      client.leave(`group-${data.groupId}`);
      console.log(client.rooms);
      client.to(`group-${data.groupId}`).emit('userGroupLeave');
    }

    @SubscribeMessage('onTypingStart')
    onTypingStart(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log('onTypingStart');
      console.log(data.conversationId);
      console.log(client.rooms);
      client.to(`conversation-${data.conversationId}`).emit('onTypingStart');
    }

    @SubscribeMessage('onTypingStop')
    onTypingStop(
      @MessageBody() data: any,
      @ConnectedSocket() client: AuthenticatedSocket,
    ) {
      console.log('onTypingStop');
      console.log(data.conversationId);
      console.log(client.rooms);
      client.to(`conversation-${data.conversationId}`).emit('onTypingStop');
    }

    @OnEvent('message.create')
    handleMessageCreateEvent(payload: CreateMessageResponse) {
      console.log('Inside message.create');
      const {
        author,
        conversation: { creator, recipient },
      } = payload.message;

      const authorSocket = this.sessions.getUserSocket(author.id);
      const recipientSocket =
        author.id === creator.id
          ? this.sessions.getUserSocket(recipient.id)
          : this.sessions.getUserSocket(creator.id);

      if (authorSocket) authorSocket.emit('onMessage', payload);
      if (recipientSocket) recipientSocket.emit('onMessage', payload);
    }

    @OnEvent('conversation.create')
    handleConversationCreateEvent(payload: Conversation) {
      console.log('Inside conversation.create');
      const recipientSocket = this.sessions.getUserSocket(payload.recipient.id);
      if (recipientSocket) recipientSocket.emit('onConversation', payload);
    }

    @OnEvent('message.delete')
    async handleMessageDelete(payload) {
      console.log('Inside message.delete');
      console.log(payload);
      const conversation = await this.conversationService.findById(
        payload.conversationId,
      );
      if (!conversation) return;
      const { creator, recipient } = conversation;
      const recipientSocket =
        creator.id === payload.userId
          ? this.sessions.getUserSocket(recipient.id)
          : this.sessions.getUserSocket(creator.id);
      if (recipientSocket) recipientSocket.emit('onMessageDelete', payload);
    }

    @OnEvent('message.update')
    async handleMessageUpdate(message: Message) {
      const {
        author,
        conversation: { creator, recipient },
      } = message;
      console.log(message);
      const recipientSocket =
        author.id === creator.id
          ? this.sessions.getUserSocket(recipient.id)
          : this.sessions.getUserSocket(creator.id);
      if (recipientSocket) recipientSocket.emit('onMessageUpdate', message);
    }

    @OnEvent('group.message.create')
    async handleGroupMessageCreate(payload: CreateGroupMessageResponse) {
      const { id } = payload.group;
      console.log('Inside group.message.create');
      this.server.to(`group-${id}`).emit('onGroupMessage', payload);
    }

    @OnEvent('group.create')
    handleGroupCreate(payload: Group) {
      console.log('group.create event');
      payload.users.forEach((user) => {
        const socket = this.sessions.getUserSocket(user.id);
        socket && socket.emit('onGroupCreate', payload);
      });
    }

    @OnEvent('group.message.update')
    handleGroupMessageUpdate(payload: GroupMessage) {
      const room = `group-${payload.group.id}`;
      console.log(room);
      this.server.to(room).emit('onGroupMessageUpdate', payload);
    }

    @OnEvent('group.user.add')
    handleGroupUserAdd(payload: AddGroupUserResponse) {
      const recipientSocket = this.sessions.getUserSocket(payload.user.id);
      console.log('inside group.user.add');
      console.log(`group-${payload.group.id}`);
      this.server
        .to(`group-${payload.group.id}`)
        .emit('onGroupReceivedNewUser', payload);
      recipientSocket && recipientSocket.emit('onGroupUserAdd', payload);
    }

    @OnEvent('group.user.remove')
    handleGroupUserRemove(payload: RemoveGroupUserResponse) {
      const { group, user } = payload;
      const ROOM_NAME = `group-${payload.group.id}`;
      const removedUserSocket = this.sessions.getUserSocket(payload.user.id);
      console.log(payload);
      console.log('Inside group.user.remove');
      if (removedUserSocket) {
        console.log('Emitting onGroupRemoved');
        removedUserSocket.emit('onGroupRemoved', payload);
        removedUserSocket.leave(ROOM_NAME);
      }
      this.server.to(ROOM_NAME).emit('onGroupRecipientRemoved', payload);
      const onlineUsers = group.users
        .map((user) => this.sessions.getUserSocket(user.id) && user)
        .filter((user) => user);
      // this.server.to(ROOM_NAME).emit('onlineGroupUsersReceived', { onlineUsers });
    }

    @OnEvent('group.owner.update')
    handleGroupOwnerUpdate(payload: Group) {
      const ROOM_NAME = `group-${payload.id}`;
      const newOwnerSocket = this.sessions.getUserSocket(payload.owner.id);
      console.log('Inside group.owner.update');
      const { rooms } = this.server.sockets.adapter;
      console.log(rooms.get(ROOM_NAME));
      const socketsInRoom = rooms.get(ROOM_NAME);
      console.log('Sockets In Room');
      console.log(socketsInRoom);
      console.log(newOwnerSocket);
      // Check if the new owner is in the group (room)
      this.server.to(ROOM_NAME).emit('onGroupOwnerUpdate', payload);
      if (newOwnerSocket && !socketsInRoom.has(newOwnerSocket.id)) {
        console.log('The new owner is not in the room...');
        newOwnerSocket.emit('onGroupOwnerUpdate', payload);
      }
    }

    @OnEvent('group.user.leave')
    handleGroupUserLeave(payload) {
      console.log('inside group.user.leave');
      const ROOM_NAME = `group-${payload.group.id}`;
      const { rooms } = this.server.sockets.adapter;
      const socketsInRoom = rooms.get(ROOM_NAME);
      const leftUserSocket = this.sessions.getUserSocket(payload.userId);
      /**
       * If socketsInRoom is undefined, this means that there is
       * no one connected to the room. So just emit the event for
       * the connected user if they are online.
       */
      console.log(socketsInRoom);
      console.log(leftUserSocket);
      if (leftUserSocket && socketsInRoom) {
        console.log('user is online, at least 1 person is in the room');
        if (socketsInRoom.has(leftUserSocket.id)) {
          console.log('User is in room... room set has socket id');
          return this.server
            .to(ROOM_NAME)
            .emit('onGroupParticipantLeft', payload);
        } else {
          console.log('User is not in room, but someone is there');
          leftUserSocket.emit('onGroupParticipantLeft', payload);
          this.server.to(ROOM_NAME).emit('onGroupParticipantLeft', payload);
          return;
        }
      }
      if (leftUserSocket && !socketsInRoom) {
        console.log('User is online but there are no sockets in the room');
        return leftUserSocket.emit('onGroupParticipantLeft', payload);
      }
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