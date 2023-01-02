import { Socket } from "socket.io";
import { User } from "src/utils/typeorm";

export interface AuthenticatedSocket extends Socket {
    user?: User;
  }