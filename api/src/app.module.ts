import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { FriendRequestsModule } from './friend-request/friend-request.module';
import { FriendModule } from './friend/friend.module';
import { GatewayModule } from './gateway/dtos/gateway.module';
import { UserModule } from './user/user.module';
import { ThrottlerBehindProxyGuard } from './utils/throttler';
import entities, { FriendRequest } from './utils/typeorm';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FriendModule,
    FriendRequestsModule,
    ConfigModule.forRoot({ envFilePath }),
    PassportModule.register({ session: true }),
    GatewayModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 10,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard
    }
  ],
})
export class AppModule {}
