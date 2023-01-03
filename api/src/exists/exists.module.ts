import { Module } from "@nestjs/common";
import { ConversationModule } from "src/conversation/conversation.module";
import { UserModule } from "src/user/user.module";
import { ExistsController } from "./exists.controller";

@Module({
    imports: [ConversationModule, UserModule],
    controllers: [ExistsController],
    providers: [],
  })
  export class ExistsModule {}