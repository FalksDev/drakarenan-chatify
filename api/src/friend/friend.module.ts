import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { Repositories, Services } from "src/utils/constants";
import { Friend } from "src/utils/typeorm";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
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