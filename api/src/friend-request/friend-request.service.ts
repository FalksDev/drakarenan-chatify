import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendAlreadyExists } from "../friend/exceptions/FriendAlreadyExists";
import { IFriendService } from "../friend/interfaces/friend";
import { UserNotFoundException } from "../user/exceptions/UserNotFound";
import { IUserService } from "../user/interfaces/user";
import { Repositories, Services } from "../utils/constants";
import { Friend, FriendRequest } from "../utils/typeorm";
import { CancelFriendRequestParams, CreateFriendParams, FriendRequestParams } from "../utils/types";
import { Repository } from "typeorm";
import { FriendRequestAcceptedException } from "./exceptions/FriendReqeustAccepted";
import { FriendRequestException } from "./exceptions/FriendRequest";
import { FriendRequestNotFoundException } from "./exceptions/FriendRequestNotFound";
import { FriendRequestPending } from "./exceptions/FriendRequestPending";
import { IFriendRequestService } from "./interfaces/friend-request";

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @Inject(Repositories.FRIEND)
    private readonly friendRepository: Repository<Friend>,
    @Inject(Repositories.FRIEND_REQUEST)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @Inject(Services.USER)
    private readonly userService: IUserService,
    @Inject(Services.FRIEND)
    private readonly friendsService: IFriendService,
  ) {}

  getFriendRequests(id: number): Promise<FriendRequest[]> {
    const status = 'pending';
    return this.friendRequestRepository.find({
      where: [
        { sender: { id }, status },
        { receiver: { id }, status },
      ],
      relations: ['receiver', 'sender'],
    });
  }

  async cancel({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.sender.id !== userId) throw new FriendRequestException();
    await this.friendRequestRepository.delete(id);
    return friendRequest;
  }

  async create({ user: sender, username }: CreateFriendParams) {
    const receiver = await this.userService.findUser({ username });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPending();
    if (receiver.id === sender.id)
      throw new FriendRequestException('Cannot Add Yourself');
    const isFriends = await this.friendsService.isFriends(
      sender.id,
      receiver.id,
    );
    if (isFriends) throw new FriendAlreadyExists();
    const friend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRequestRepository.save(friend);
  }

  async accept({ id, userId }: FriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'accepted';
    const updatedFriendRequest = await this.friendRequestRepository.save(
      friendRequest,
    );
    const newFriend = this.friendRepository.create({
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    });
    const friend = await this.friendRepository.save(newFriend);
    return { friend, friendRequest: updatedFriendRequest };
  }

  async reject({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'rejected';
    return this.friendRequestRepository.save(friendRequest);
  }

  isPending(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'pending',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending',
        },
      ],
    });
  }

  findById(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne({
      where: { id },
      relations: ['receiver', 'sender'],
    });
  }
}