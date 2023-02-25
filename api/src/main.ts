import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeormStore } from 'connect-typeorm/out';
import dataSource from '../db/data-source';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './gateway/dtos/gateway.adapter';
import { Session } from './utils/typeorm';

async function bootstrap() {
  const { APP_PORT, COOKIE_SECRET } = process.env;
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = dataSource.getRepository(Session);
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  
  app.setGlobalPrefix('api');

  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://drakarenan-chatify.vercel.app',
    credentials: true,
  });

  // app.enableCors({ origin: ['http://localhost:5173', 'https://drakarenan-chatify.vercel.app/'], credentials: true });
  // app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  app.set('trust proxy', 'loopback');
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHATIFYSESSID',
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(APP_PORT, () => {
      console.log(`Running on Port ${APP_PORT}`);
      console.log(
        `Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
