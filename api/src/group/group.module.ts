import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { ImageStorageModule } from "../image-storage/image-storage.module";
import { MessageAttachmentModule } from "../message-attachment/message-attachment.module";
import { UserModule } from "../user/user.module";
import { Repositories, Services } from "../utils/constants";
import { isAuthorized } from "../utils/helpers";
import { Group } from "../utils/typeorm/entities/Group";
import { GroupMessage } from "../utils/typeorm/entities/GroupMessage";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
import { GroupController } from "./controllers/goup.controller";
import { GroupMessageController } from "./controllers/group-message.controller";
import { GroupRecipientsController } from "./controllers/group-recipient.controller";
import { GroupMiddleware } from "./middlewares/group.middleware";
import { GroupMessageService } from "./services/group-message.service";
import { GroupRecipientService } from "./services/group-recipient.service";
import { GroupService } from "./services/group.service";

@Module({
    imports: [
      DatabaseModule,
      UserModule,
      MessageAttachmentModule,
      ImageStorageModule,
    ],
    controllers: [
      GroupController,
      GroupMessageController,
      GroupRecipientsController,
    ],
    providers: [
      ...repositoryResolver(Repositories.GROUP, Group),
      ...repositoryResolver(Repositories.GROUP_MESSAGE, GroupMessage),
      {
        provide: Services.GROUP,
        useClass: GroupService,
      },
      {
        provide: Services.GROUP_MESSAGE,
        useClass: GroupMessageService,
      },
      {
        provide: Services.GROUP_RECIPIENT,
        useClass: GroupRecipientService,
      },
    ],
    exports: [
      {
        provide: Services.GROUP,
        useClass: GroupService,
      },
    ],
  })
  export class GroupModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(isAuthorized, GroupMiddleware).forRoutes('groups/:id');
    }
  }