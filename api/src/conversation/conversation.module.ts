import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { FriendModule } from "src/friend/friend.module";
import { UserModule } from "src/user/user.module";
import { Repositories, Services } from "src/utils/constants";
import { isAuthorized } from "src/utils/helpers";
import { Conversation } from "src/utils/typeorm/entities/Conversation";
import { Message } from "src/utils/typeorm/entities/Message";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
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