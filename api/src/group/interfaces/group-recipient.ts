import { Group } from "../../utils/typeorm/entities/Group";
import { AddGroupRecipientParams, AddGroupUserResponse, RemoveGroupRecipientParams, RemoveGroupUserResponse, LeaveGroupParams, CheckUserGroupParams } from "../../utils/types";

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