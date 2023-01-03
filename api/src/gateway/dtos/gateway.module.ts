import { Module } from "@nestjs/common";
import { ConversationModule } from "src/conversation/conversation.module";
import { FriendModule } from "src/friend/friend.module";
import { GroupModule } from "src/group/group.module";
import { Services } from "src/utils/constants";
import { MessagingGateway } from "./gateway";
import { GatewaySessionManager } from "./gateway.session";

@Module({
    imports: [FriendModule, GroupModule, ConversationModule],
    providers: [
      MessagingGateway,
      {
        provide: Services.GATEWAY_SESSION_MANAGER,
        useClass: GatewaySessionManager,
      },
    ],
    exports: [
      MessagingGateway,
      {
        provide: Services.GATEWAY_SESSION_MANAGER,
        useClass: GatewaySessionManager,
      },
    ],
  })
  export class GatewayModule {}