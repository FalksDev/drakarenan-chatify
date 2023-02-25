import { Controller, Delete, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SkipThrottle } from "@nestjs/throttler";
import { Routes, ServerEvents, Services } from "../utils/constants";
import { AuthUser } from "../utils/decorators";
import { User } from "../utils/typeorm";
import { IFriendService } from "./interfaces/friend";

@SkipThrottle()
@Controller(Routes.FRIEND)
export class FriendController {
  constructor(
    @Inject(Services.FRIEND)
    private readonly friendsService: IFriendService,
    private readonly event: EventEmitter2,
  ) {}

  @Get()
  getFriends(@AuthUser() user: User) {
    console.log('Fetching Friends');
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  async deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const friend = await this.friendsService.deleteFriend({ id, userId });
    this.event.emit(ServerEvents.FRIEND_REMOVED, { friend, userId });
    return friend;
  }
}