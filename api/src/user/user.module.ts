import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { ImageStorageModule } from "src/image-storage/image-storage.module";
import { Repositories, Services } from "src/utils/constants";
import { User, UserPresence } from "src/utils/typeorm";
import { Profile } from "src/utils/typeorm/entities/Profile";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
import { UserPresenceController } from "./controllers/user-presence.controller";
import { UserProfileController } from "./controllers/user-profile.controller";
import { UsersController } from "./controllers/user.controller";
import { UserPresenceService } from "./services/user-presence.service";
import { UserProfileService } from "./services/user-profile.service";
import { UserService } from "./services/user.service";

@Module({
    imports:[
        DatabaseModule,
        ImageStorageModule
    ],
    controllers: [
        UsersController,
        UserPresenceController,
        UserProfileController
    ],
    providers: [
        ...repositoryResolver(Repositories.USER, User),
        ...repositoryResolver(Repositories.USER_PRESENCE, UserPresence),
        ...repositoryResolver(Repositories.PROFILE, Profile),
        {
            provide: Services.USER,
            useClass: UserService
        },
        {
            provide: Services.USER_PRESENCE,
            useClass: UserPresenceService,  
        },
        {
            provide: Services.PROFILE,
            useClass: UserProfileService,
        },
    ],
    exports: [
        {
            provide: Services.USER,
            useClass: UserService
        },
        {
            provide: Services.USER_PRESENCE,
            useClass: UserPresenceService,  
        },
        {
            provide: Services.PROFILE,
            useClass: UserProfileService,
        },
    ]
})

export class UserModule {}