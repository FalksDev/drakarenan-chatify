import { Module } from "@nestjs/common";
import { FriendModule } from "src/friend/friend.module";
import { Services } from "src/utils/constants";
import { MessagingGateway } from "./gateway";
import { GatewaySessionManager } from "./gateway.session";

@Module({
    imports: [FriendModule],
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