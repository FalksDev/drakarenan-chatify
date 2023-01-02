import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { FriendModule } from "src/friend/friend.module";
import { UserModule } from "src/user/user.module";
import { Repositories, Services } from "src/utils/constants";
import { Friend, FriendRequest, User } from "src/utils/typeorm";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
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