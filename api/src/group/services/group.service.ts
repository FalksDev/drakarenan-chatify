import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IImageStorageService } from "../../image-storage/interfaces/image-storage";
import { UserNotFoundException } from "../../user/exceptions/UserNotFound";
import { IUserService } from "../../user/interfaces/user";
import { Repositories, Services } from "../../utils/constants";
import { generateUUIDV4 } from "../../utils/helpers";
import { User } from "../../utils/typeorm";
import { Group } from "../../utils/typeorm/entities/Group";
import { CreateGroupParams, FetchGroupsParams, AccessParams, TransferOwnerParams, UpdateGroupDetailsParams } from "../../utils/types";
import { Repository } from "typeorm";
import { GroupNotFoundException } from "../exceptions/GroupNotFound";
import { GroupOwnerTransferException } from "../exceptions/GroupOwnerTransfer";
import { IGroupService } from "../interfaces/group";

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject(Repositories.GROUP)
    private readonly groupRepository: Repository<Group>,
    @Inject(Services.USER)
    private readonly userService: IUserService,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageStorageService: IImageStorageService,
  ) {}

  async createGroup(params: CreateGroupParams) {
    const { creator, title } = params;
    const usersPromise = params.users.map((username) =>
      this.userService.findUser({ username }),
    );
    const users = (await Promise.all(usersPromise)).filter((user) => user);
    users.push(creator);
    const groupParams = { owner: creator, users, creator, title };
    const group = this.groupRepository.create(groupParams);
    return this.groupRepository.save(group);
  }

  getGroups(params: FetchGroupsParams): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('user.id IN (:users)', { users: [params.userId] })
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('group.creator', 'creator')
      .leftJoinAndSelect('group.owner', 'owner')
      .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
    //   .leftJoinAndSelect('users.profile', 'usersProfile')
    //   .leftJoinAndSelect('users.presence', 'usersPresence')
      .orderBy('group.lastMessageSentAt', 'DESC')
      .getMany();
  }

  findGroupById(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: [
        'creator',
        'users',
        'lastMessageSent',
        'owner',
        // 'users.profile',
        // 'users.presence',
      ],
    });
  }

  saveGroup(group: Group): Promise<Group> {
    return this.groupRepository.save(group);
  }

  async hasAccess({ id, userId }: AccessParams): Promise<User | undefined> {
    const group = await this.findGroupById(id);
    if (!group) throw new GroupNotFoundException();
    return group.users.find((user) => user.id === userId);
  }

  async transferGroupOwner({
    userId,
    groupId,
    newOwnerId,
  }: TransferOwnerParams): Promise<Group> {
    const group = await this.findGroupById(groupId);
    if (!group) throw new GroupNotFoundException();
    if (group.owner.id !== userId)
      throw new GroupOwnerTransferException('Insufficient Permissions');
    if (group.owner.id === newOwnerId)
      throw new GroupOwnerTransferException(
        'Cannot Transfer Owner to yourself',
      );
    const newOwner = await this.userService.findUser({ id: newOwnerId });
    if (!newOwner) throw new UserNotFoundException();
    group.owner = newOwner;
    return this.groupRepository.save(group);
  }

  async updateDetails(params: UpdateGroupDetailsParams): Promise<Group> {
    const group = await this.findGroupById(params.id);
    if (!group) throw new GroupNotFoundException();
    if (params.avatar) {
      const key = generateUUIDV4();
      await this.imageStorageService.upload({ key, file: params.avatar });
      group.avatar = key;
    }
    group.title = params.title ?? group.title;
    return this.groupRepository.save(group);
  }
}