import { Friend } from "./entities/Friend";
import { FriendRequest } from "./entities/FriendRequest";
import { Session } from "./entities/Session";
import { User } from "./entities/User";
import { UserPresence } from "./entities/UserPresence";

const entities = [
    Session,
    User,
    Friend,
    FriendRequest,
    UserPresence
  ];
  
  export default entities;
  
  export {
    Session,
    User,
    Friend,
    FriendRequest,
    UserPresence
  };