import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendNotFoundException } from "../friend/exceptions/FriendNotFound";
import { IFriendService } from "../friend/interfaces/friend";
import { UserNotFoundException } from "../user/exceptions/UserNotFound";
import { IUserService } from "../user/interfaces/user";
import { Repositories, Services } from "../utils/constants";
import { User } from "../utils/typeorm";
import { Conversation } from "../utils/typeorm/entities/Conversation";
import { Message } from "../utils/typeorm/entities/Message";
import { CreateConversationParams, AccessParams, GetConversationMessagesParams, UpdateConversationParams } from "../utils/types";
import { Repository } from "typeorm";
import { ConversationExistsException } from "./exceptions/ConversationExists";
import { ConversationNotFoundException } from "./exceptions/ConversationNotFound";
import { CreateConversationException } from "./exceptions/CreateConversation";
import { IConversationService } from "./interfaces/conversation";

@Injectable()
export class ConversationService implements IConversationService {
    constructor(
        @Inject(Repositories.CONVERSATION)
        private readonly conversationRepository: Repository<Conversation>,
        @Inject(Repositories.MESSAGE)
        private readonly messageRepository: Repository<Message>,
        @Inject(Services.USER)
        private readonly userService: IUserService,
        @Inject(Services.FRIEND)
        private readonly friendsService: IFriendService,
      ) {}
    
      async getConversations(id: number): Promise<Conversation[]> {
        return this.conversationRepository
          .createQueryBuilder('conversation')
          .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
          .leftJoinAndSelect('conversation.creator', 'creator')
          .leftJoinAndSelect('conversation.recipient', 'recipient')
        //   .leftJoinAndSelect('creator.peer', 'creatorPeer')
        //   .leftJoinAndSelect('recipient.peer', 'recipientPeer')
        //   .leftJoinAndSelect('creator.profile', 'creatorProfile')
        //   .leftJoinAndSelect('recipient.profile', 'recipientProfile')
          .where('creator.id = :id', { id })
          .orWhere('recipient.id = :id', { id })
          .orderBy('conversation.lastMessageSentAt', 'DESC')
          .getMany();
      }
    
      async findById(id: number) {
        return this.conversationRepository.findOne({
          where: { id },
          relations: [
            'creator',
            'recipient',
            // 'creator.profile',
            // 'recipient.profile',
            'lastMessageSent',
          ],
        });
      }
    
      async isCreated(userId: number, recipientId: number) {
        return this.conversationRepository.findOne({
          where: [
            {
              creator: { id: userId },
              recipient: { id: recipientId },
            },
            {
              creator: { id: recipientId },
              recipient: { id: userId },
            },
          ],
        });
      }
    
      async createConversation(creator: User, params: CreateConversationParams) {
        const { username, message: content } = params;
        const recipient = await this.userService.findUser({ username });
        if (!recipient) throw new UserNotFoundException();
        if (creator.id === recipient.id)
          throw new CreateConversationException(
            'Cannot create Conversation with yourself',
          );
        const isFriends = await this.friendsService.isFriends(
          creator.id,
          recipient.id,
        );
        if (!isFriends) throw new FriendNotFoundException();
        const exists = await this.isCreated(creator.id, recipient.id);
        if (exists) throw new ConversationExistsException();
        const newConversation = this.conversationRepository.create({
          creator,
          recipient,
        });
        const conversation = await this.conversationRepository.save(
          newConversation,
        );
        const newMessage = this.messageRepository.create({
          content,
          conversation,
          author: creator
        });
        await this.messageRepository.save(newMessage);
        return conversation;
      }
    
      async hasAccess({ id, userId }: AccessParams) {
        const conversation = await this.findById(id);
        if (!conversation) throw new ConversationNotFoundException();
        return (
          conversation.creator.id === userId || conversation.recipient.id === userId
        );
      }
    
      save(conversation: Conversation): Promise<Conversation> {
        return this.conversationRepository.save(conversation);
      }
    
      getMessages({
        id,
        limit,
      }: GetConversationMessagesParams): Promise<Conversation> {
        return this.conversationRepository
          .createQueryBuilder('conversation')
          .where('id = :id', { id })
          .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
          .leftJoinAndSelect('conversation.messages', 'message')
          .where('conversation.id = :id', { id })
          .orderBy('message.createdAt', 'DESC')
          .limit(limit)
          .getOne();
      }
    
      update({ id, lastMessageSent }: UpdateConversationParams) {
        return this.conversationRepository.update(id, { lastMessageSent });
      }
}