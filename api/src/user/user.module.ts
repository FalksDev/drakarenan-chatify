import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { Repositories, Services } from "src/utils/constants";
import { User } from "src/utils/typeorm";
import { repositoryResolver } from "src/utils/typeorm/repository.resolver";
import { UsersController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [DatabaseModule],
    controllers: [
        UsersController
    ],
    providers: [
        ...repositoryResolver(Repositories.USER, User),
        {
            provide: Services.USER,
            useClass: UserService
        }
    ],
    exports: [
        {
            provide: Services.USER,
            useClass: UserService
        }
    ]
})

export class UserModule {}