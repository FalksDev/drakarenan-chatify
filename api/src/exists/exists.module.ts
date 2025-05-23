import { Module } from "@nestjs/common";
import { ConversationModule } from "../conversation/conversation.module";
import { UserModule } from "../user/user.module";
import { ExistsController } from "./exists.controller";

@Module({
    imports: [ConversationModule, UserModule],
    controllers: [ExistsController],
    providers: [],
  })
  export class ExistsModule {}