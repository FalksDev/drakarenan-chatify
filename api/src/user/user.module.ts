import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { Repositories, Services } from "src/utils/constants";
import { User, UserPresence } from "src/utils/typeorm";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
import { UserPresenceController } from "./controllers/user-presence.controller";
import { UsersController } from "./controllers/user.controller";
import { UserPresenceService } from "./services/user-presence.service";
import { UserService } from "./services/user.service";

@Module({
    imports:[
        // TypeOrmModule.forFeature([User, UserPresence]),
        DatabaseModule
    ],
    controllers: [
        UsersController,
        UserPresenceController
    ],
    providers: [
        ...repositoryResolver(Repositories.USER, User),
        ...repositoryResolver(Repositories.USER_PRESENCE, UserPresence),
        {
            provide: Services.USER,
            useClass: UserService
        },
        {
            provide: Services.USER_PRESENCE,
            useClass: UserPresenceService,  
        }
    ],
    exports: [
        {
            provide: Services.USER,
            useClass: UserService
        },
        {
            provide: Services.USER_PRESENCE,
            useClass: UserPresenceService,  
        }
    ]
})

export class UserModule {}