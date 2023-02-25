import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { FriendModule } from "../friend/friend.module";
import { UserModule } from "../user/user.module";
import { Repositories, Services } from "../utils/constants";
import { Friend, FriendRequest, User } from "../utils/typeorm";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
import { FriendRequestController } from "./friend-request.controller";
import { FriendRequestService } from "./friend-request.service";

@Module({
    imports: [
    //   TypeOrmModule.forFeature([Friend, FriendRequest]),
      DatabaseModule,
      UserModule,
      FriendModule,
    ],
    controllers: [FriendRequestController],
    providers: [
      ...repositoryResolver(Repositories.FRIEND, Friend),
      ...repositoryResolver(Repositories.FRIEND_REQUEST, FriendRequest),
      {
        provide: Services.FRIEND_REQUEST,
        useClass: FriendRequestService,
      },
    ],
  })
  export class FriendRequestsModule {}