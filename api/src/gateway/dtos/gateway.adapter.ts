import { IoAdapter } from "@nestjs/platform-socket.io";
import dataSource from "../../../db/data-source";
import { Session, User } from "src/utils/typeorm";
import { AuthenticatedSocket } from "./interfaces/AuthenticatedSocket";
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from "class-transformer";

export class WebsocketAdapter extends IoAdapter {
    createIOServer(port: number, options?: any) {
        const sessionRepository = dataSource.getRepository(Session);
        const server = super.createIOServer(port, options);
        server.use(async (socket: AuthenticatedSocket, next) => {
            console.log('Inside Websocket Adapter');
            const { cookie: clientCookie } = socket.handshake.headers;
            if (!clientCookie) {
                console.log('Client has no cookies');
                return next(new Error('Not Authenticated. No cookies were sent'));
            }
            const { CHATIFYSESSID } = cookie.parse(clientCookie);
            if (!CHATIFYSESSID) {
                console.log('CHAT_APP_SESSION_ID DOES NOT EXIST');
                return next(new Error('Not Authenticated'));
            }
            const signedCookie = cookieParser.signedCookie(
                CHATIFYSESSID,
                process.env.COOKIE_SECRET,
            );
            if (!signedCookie) return next(new Error('Error signing cookie'));

            const sessionDB = await sessionRepository.findOne({ where: { id: signedCookie }});
            if (!sessionDB) return next(new Error('No session found'));

            const userFromJson = JSON.parse(sessionDB.json);
            if (!userFromJson.passport || !userFromJson.passport.user)
                return next(new Error('Passport or User object does not exist.'));

            const userDB = plainToInstance(
                User,
                JSON.parse(sessionDB.json).passport.user,
            );
            
            socket.user = userDB;
            next();
        });
        return server;
     }
}