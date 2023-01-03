import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConversationModule } from "src/conversation/conversation.module";
import { DatabaseModule } from "src/database/database.module";
import { FriendModule } from "src/friend/friend.module";
import { ImageStorageModule } from "src/image-storage/image-storage.module";
import { MessageAttachmentModule } from "src/message-attachment/message-attachment.module";
import { Repositories, Services } from "src/utils/constants";
import { Conversation } from "src/utils/typeorm/entities/Conversation";
import { Message } from "src/utils/typeorm/entities/Message";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
    imports: [
      DatabaseModule,
      ImageStorageModule,
      MessageAttachmentModule,
      ConversationModule,
      FriendModule,
    ],
    controllers: [MessageController],
    providers: [
      ...repositoryResolver(Repositories.MESSAGE, Message),
      ...repositoryResolver(Repositories.CONVERSATION, Conversation),
      {
        provide: Services.MESSAGE,
        useClass: MessageService,
      },
    ],
  })
  export class MessagesModule {}