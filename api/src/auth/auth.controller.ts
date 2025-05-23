import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { instanceToPlain, plainToInstance } from 'class-transformer';
  import { Request, Response } from 'express';
import { IUserService } from '../user/interfaces/user';
  import { Routes, Services } from '../utils/constants';
  import { AuthenticatedRequest } from '../utils/types';
  import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
  import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';
  
  @Controller(Routes.AUTH)
  export class AuthController {
    constructor(
      @Inject(Services.AUTH) private authService: IAuthService,
      @Inject(Services.USER) private userService: IUserService,
    ) {}
  
    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
      return instanceToPlain(await this.userService.createUser(createUserDto));
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Res() res: Response) {
      return res.sendStatus(HttpStatus.OK);
    }
  
    @Get('status')
    @UseGuards(AuthenticatedGuard)
    async status(@Req() req: Request, @Res() res: Response) {
      res.send(req.user);
    }
  
    @Post('logout')
    @UseGuards(AuthenticatedGuard)
    logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        req.logout((err) => {
            return err ? res.sendStatus(400) : res.sendStatus(200);
        });
    }
  }