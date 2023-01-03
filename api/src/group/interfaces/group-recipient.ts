import { Group } from "src/utils/typeorm/entities/Group";
import { AddGroupRecipientParams, AddGroupUserResponse, RemoveGroupRecipientParams, RemoveGroupUserResponse, LeaveGroupParams, CheckUserGroupParams } from "src/utils/types";

export interface IGroupRecipientService {
    addGroupRecipient(
      params: AddGroupRecipientParams,
    ): Promise<AddGroupUserResponse>;
    removeGroupRecipient(
      params: RemoveGroupRecipientParams,
    ): Promise<RemoveGroupUserResponse>;
    leaveGroup(params: LeaveGroupParams);
    isUserInGroup(params: CheckUserGroupParams): Promise<Group>;
  }