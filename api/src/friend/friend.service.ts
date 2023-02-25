import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repositories } from "../utils/constants";
import { Friend } from "../utils/typeorm";
import { DeleteFriendRequestParams } from "../utils/types";
import { Repository } from "typeorm";
import { DeleteFriendException } from "./exceptions/DeleteFriend";
import { FriendNotFoundException } from "./exceptions/FriendNotFound";
import { IFriendService } from "./interfaces/friend";

@Injectable()
export class FriendService implements IFriendService {
    constructor(
        @Inject(Repositories.FRIEND)
        private readonly friendRepository: Repository<Friend>
    ) {}

    getFriends(id: number): Promise<Friend[]> {
        return this.friendRepository.find({
            where: [{ sender: { id } }, { receiver: { id } }],
            relations: [
                "sender",
                "receiver",
                "receiver.presence",
                "sender.presence"
            ]
        });
    }

    findFriendById(id: number): Promise<Friend> {
        return this.friendRepository.findOne({
            where: { id },
            relations: [
                "sender",
                "receiver",
                "sender.presence",
                "receiver.presence"
            ]
        });
    }

    async deleteFriend({ id, userId }: DeleteFriendRequestParams) {
        const friend = await this.findFriendById(id);
        if (!friend) throw new FriendNotFoundException();
        console.log(friend);
        if (friend.receiver.id !== userId && friend.sender.id !== userId)
          throw new DeleteFriendException();
        await this.friendRepository.delete(id);
        return friend;
      }

      isFriends(userOneId: number, userTwoId: number): Promise<Friend> {
          return this.friendRepository.findOne({
            where: [
                {
                    sender: { id: userOneId },
                    receiver: { id: userTwoId },
                },
                {
                    sender: { id: userTwoId },
                    receiver: { id: userOneId },
                }
            ],
          });
      }
}