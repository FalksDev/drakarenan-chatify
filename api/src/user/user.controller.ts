import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Query,
  } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { UserAlreadyExists } from './exceptions/UserAlreadyExists';
import { IUserService } from './interfaces/user';
  
  @Controller(Routes.USER)
  export class UsersController {
    constructor(
      @Inject(Services.USER) private readonly userService: IUserService,
    ) {}
  
    @Get('check')
    async checkUsername(@Query('username') username: string) {
      if (!username)
        throw new HttpException('Invalid Query', HttpStatus.BAD_REQUEST);
      const user = await this.userService.findUser({ username });
      if (user) throw new UserAlreadyExists();
      return HttpStatus.OK;
    }
  }