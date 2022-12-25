import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repositories } from "src/utils/constants";
import { hashPassword } from "src/utils/helpers";
import { User } from "src/utils/typeorm";
import { CreateUserDetails, FindUserOptions, FindUserParams } from "src/utils/types";
import { Repository } from "typeorm";
import { IUserService } from "./interfaces/user";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(Repositories.USER) private userRepository: Repository<User>
    ) {}

    async createUser(userDetails: CreateUserDetails) {
        const existingUser = await this.userRepository.findOne({
            where: {
                username: userDetails.username
            }
        });

        if (existingUser)
          throw new HttpException('User already exists', HttpStatus.CONFLICT);
          
        const password = await hashPassword(userDetails.password);
        const params = { ...userDetails, password};
        const newUser = this.userRepository.create(params);
        return this.userRepository.save(newUser);
    }

      async findUser(
        params: FindUserParams,
        options?: FindUserOptions,
      ): Promise<User> {
        const selections: (keyof User)[] = [
          'email',
          'username',
          'firstName',
          'lastName',
          'id',
        ];

        const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];
        return this.userRepository.findOne({
            where: {
                ...params
            },
            select: options?.selectAll ? selectionsWithPassword : selections
        });
    }

    async saveUser(user: User) {
        return this.userRepository.save(user);
    }
}

