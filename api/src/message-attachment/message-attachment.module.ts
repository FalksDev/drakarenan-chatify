import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { ImageStorageModule } from "src/image-storage/image-storage.module";
import { Repositories, Services } from "src/utils/constants";
import { GroupMessageAttachment } from "src/utils/typeorm/entities/GroupMessageAttachment";
import { MessageAttachment } from "src/utils/typeorm/entities/MessageAttachment";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
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