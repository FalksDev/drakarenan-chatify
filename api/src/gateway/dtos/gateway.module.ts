import { Module } from "@nestjs/common";
import { ConversationModule } from "../../conversation/conversation.module";
import { FriendModule } from "../../friend/friend.module";
import { GroupModule } from "../../group/group.module";
import { Services } from "../../utils/constants";
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