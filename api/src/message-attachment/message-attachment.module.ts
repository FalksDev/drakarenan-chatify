import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { ImageStorageModule } from "../image-storage/image-storage.module";
import { Repositories, Services } from "../utils/constants";
import { GroupMessageAttachment } from "../utils/typeorm/entities/GroupMessageAttachment";
import { MessageAttachment } from "../utils/typeorm/entities/MessageAttachment";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
import { MessageAttachmentService } from "./message-attachment.service";

@Module({
    imports: [
      DatabaseModule,
      ImageStorageModule,
    ],
    providers: [
      ...repositoryResolver(Repositories.MESSAGE_ATTACHMENT, MessageAttachment),
      ...repositoryResolver(Repositories.GROUP_MESSAGE_ATTACHMENT, GroupMessageAttachment),
      {
        provide: Services.MESSAGE_ATTACHMENT,
        useClass: MessageAttachmentService,
      },
    ],
    exports: [
      {
        provide: Services.MESSAGE_ATTACHMENT,
        useClass: MessageAttachmentService,
      },
    ],
  })
  export class MessageAttachmentModule {}