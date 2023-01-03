import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { ImageStorageModule } from "src/image-storage/image-storage.module";
import { MessageAttachmentModule } from "src/message-attachment/message-attachment.module";
import { UserModule } from "src/user/user.module";
import { Repositories, Services } from "src/utils/constants";
import { isAuthorized } from "src/utils/helpers";
import { Group } from "src/utils/typeorm/entities/Group";
import { GroupMessage } from "src/utils/typeorm/entities/GroupMessage";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
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