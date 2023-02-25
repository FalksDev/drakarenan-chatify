import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { Repositories, Services } from "../utils/constants";
import { Friend } from "../utils/typeorm";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";

@Module({
    imports: [
        // TypeOrmModule.forFeature([Friend])
        DatabaseModule
    ],
    providers: [
      ...repositoryResolver(Repositories.FRIEND, Friend),
      {
        provide: Services.FRIEND,
        useClass: FriendService,
      },
    ],
    controllers: [FriendController],
    exports: [
      {
        provide: Services.FRIEND,
        useClass: FriendService,
      },
    ],
  })
  export class FriendModule {}