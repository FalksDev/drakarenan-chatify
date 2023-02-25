import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConversationModule } from "../conversation/conversation.module";
import { DatabaseModule } from "../database/database.module";
import { FriendModule } from "../friend/friend.module";
import { ImageStorageModule } from "../image-storage/image-storage.module";
import { MessageAttachmentModule } from "../message-attachment/message-attachment.module";
import { Repositories, Services } from "../utils/constants";
import { Conversation } from "../utils/typeorm/entities/Conversation";
import { Message } from "../utils/typeorm/entities/Message";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
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