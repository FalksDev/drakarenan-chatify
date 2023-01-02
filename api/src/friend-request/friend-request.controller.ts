import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Throttle } from "@nestjs/throttler";
import { Routes, ServerEvents, Services } from "src/utils/constants";
import { AuthUser } from "src/utils/decorators";
import { User } from "src/utils/typeorm";
import { CreateFriendDto } from "./dtos/CreateFriend.dto";
import { IFriendRequestService } from "./interfaces/friend-request";

@Controller(Routes.FRIEND_REQUEST)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIEND_REQUEST)
    private readonly friendRequestService: IFriendRequestService,
    private event: EventEmitter2,
  ) {}

  @Get()
  getFriendRequests(@AuthUser() user: User) {
    return this.friendRequestService.getFriendRequests(user.id);
  }

  @Throttle(3, 10)
  @Post()
  async createFriendRequest(
    @AuthUser() user: User,
    @Body() { username }: CreateFriendDto,
  ) {
    const params = { user, username };
    const friendRequest = await this.friendRequestService.create(params);
    this.event.emit(ServerEvents.FRIEND_REQUEST_CREATED, friendRequest);
    return friendRequest;
  }

  @Throttle(3, 10)
  @Patch(':id/accept')
  async acceptFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.friendRequestService.accept({ id, userId });
    this.event.emit(ServerEvents.FRIEND_REQUEST_ACCEPTED, response);
    return response;
  }

  @Throttle(3, 10)
  @Delete(':id/cancel')
  async cancelFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.friendRequestService.cancel({ id, userId });
    this.event.emit(ServerEvents.FRIEND_REQUEST_CANCELLED, response);
    return response;
  }

  @Throttle(3, 10)
  @Patch(':id/reject')
  async rejectFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const response = await this.friendRequestService.reject({ id, userId });
    this.event.emit(ServerEvents.FRIEND_REQUEST_REJECTED, response);
    return response;
  }
}