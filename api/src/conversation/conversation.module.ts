import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { FriendModule } from "../friend/friend.module";
import { UserModule } from "../user/user.module";
import { Repositories, Services } from "../utils/constants";
import { isAuthorized } from "../utils/helpers";
import { Conversation } from "../utils/typeorm/entities/Conversation";
import { Message } from "../utils/typeorm/entities/Message";
import { repositoryResolver } from "../utils/typeorm/repository.resolver";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import { ConversationMiddleware } from "./middlewares/conversation.middleware";

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        FriendModule,
    ],
    controllers: [ConversationController],
    providers: [
      ...repositoryResolver(Repositories.CONVERSATION, Conversation),
      ...repositoryResolver(Repositories.MESSAGE, Message),
      {
        provide: Services.CONVERSATION,
        useClass: ConversationService,
      },
    ],
    exports: [
      {
        provide: Services.CONVERSATION,
        useClass: ConversationService,
      },
    ],
  })
  export class ConversationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(isAuthorized, ConversationMiddleware)
        .forRoutes('conversations/:id');
    }
  }