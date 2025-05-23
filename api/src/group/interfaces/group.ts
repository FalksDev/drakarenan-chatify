import { User } from "../../utils/typeorm";
import { Group } from "../../utils/typeorm/entities/Group";
import { CreateGroupParams, FetchGroupsParams, AccessParams, TransferOwnerParams, UpdateGroupDetailsParams } from "../../utils/types";

export interface IGroupService {
    createGroup(params: CreateGroupParams);
    getGroups(params: FetchGroupsParams): Promise<Group[]>;
    findGroupById(id: number): Promise<Group>;
    saveGroup(group: Group): Promise<Group>;
    hasAccess(params: AccessParams): Promise<User | undefined>;
    transferGroupOwner(params: TransferOwnerParams): Promise<Group>;
    updateDetails(params: UpdateGroupDetailsParams): Promise<Group>;
  }