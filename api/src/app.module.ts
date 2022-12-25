import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath }),
    PassportModule.register({ session: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
