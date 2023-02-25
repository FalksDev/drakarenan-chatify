import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { ConversationNotFoundException } from "../conversation/exceptions/ConversationNotFound";
import { IConversationService } from "../conversation/interfaces/conversation";
import { FriendNotFoundException } from "../friend/exceptions/FriendNotFound";
import { IFriendService } from "../friend/interfaces/friend";
import { IMessageAttachmentService } from "../message-attachment/interfaces/message-attachment";
import { buildFindMessageParams } from "../utils/builders";
import { Repositories, Services } from "../utils/constants";
import { Conversation } from "../utils/typeorm/entities/Conversation";
import { Message } from "../utils/typeorm/entities/Message";
import { CreateMessageParams, DeleteMessageParams, EditMessageParams } from "../utils/types";
import { Repository } from "typeorm";
import { CannotCreateMessageException } from "./exceptions/CannotCreateMessage";
import { CannotDeleteMessage } from "./exceptions/CannotDeleteMessage";
import { IMessageService } from "./interfaces/message";

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @Inject(Repositories.MESSAGE)
    private readonly messageRepository: Repository<Message>,
    @Inject(Services.CONVERSATION)
    private readonly conversationService: IConversationService,
    @Inject(Services.MESSAGE_ATTACHMENT)
    private readonly messageAttachmentsService: IMessageAttachmentService,
    @Inject(Services.FRIEND)
    private readonly friendsService: IFriendService,
  ) {}
  async createMessage(params: CreateMessageParams) {
    const { user, content, id } = params;
    const conversation = await this.conversationService.findById(id);
    if (!conversation) throw new ConversationNotFoundException();
    const { creator, recipient } = conversation;
    const isFriends = await this.friendsService.isFriends(
      creator.id,
      recipient.id,
    );
    if (!isFriends) throw new FriendNotFoundException();
    if (creator.id !== user.id && recipient.id !== user.id)
      throw new CannotCreateMessageException();
    const message = this.messageRepository.create({
      content,
      conversation,
      author: instanceToPlain(user),
      attachments: params.attachments
        ? await this.messageAttachmentsService.create(params.attachments)
        : [],
    });
    const savedMessage = await this.messageRepository.save(message);
    conversation.lastMessageSent = savedMessage;
    const updated = await this.conversationService.save(conversation);
    return { message: savedMessage, conversation: updated };
  }

  getMessages(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['author', 'attachments', 'author.profile'],
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteMessage(params: DeleteMessageParams) {
    const { conversationId } = params;
    const msgParams = { id: conversationId, limit: 5 };
    const conversation = await this.conversationService.getMessages(msgParams);
    if (!conversation) throw new ConversationNotFoundException();
    const findMessageParams = buildFindMessageParams(params);
    const message = await this.messageRepository.findOne({
        where: { id: findMessageParams.id, author: { id: findMessageParams.author.id }, conversation: { id: findMessageParams.conversation.id } }
    });
    if (!message) throw new CannotDeleteMessage();
    if (conversation.lastMessageSent.id !== message.id)
      return this.messageRepository.delete({ id: message.id });
    return this.deleteLastMessage(conversation, message);
  }

  async deleteLastMessage(conversation: Conversation, message: Message) {
    const size = conversation.messages.length;
    const SECOND_MESSAGE_INDEX = 1;
    if (size <= 1) {
      console.log('Last Message Sent is deleted');
      await this.conversationService.update({
        id: conversation.id,
        lastMessageSent: null,
      });
      return this.messageRepository.delete({ id: message.id });
    } else {
      console.log('There are more than 1 message');
      const newLastMessage = conversation.messages[SECOND_MESSAGE_INDEX];
      await this.conversationService.update({
        id: conversation.id,
        lastMessageSent: newLastMessage,
      });
      return this.messageRepository.delete({ id: message.id });
    }
  }

  async editMessage(params: EditMessageParams) {
    const messageDB = await this.messageRepository.findOne({
      where: {
        id: params.messageId,
        author: { id: params.userId },
      },
      relations: [
        'conversation',
        'conversation.creator',
        'conversation.recipient',
        'author',
        // 'author.profile',
      ],
    });
    if (!messageDB)
      throw new HttpException('Cannot Edit Message', HttpStatus.BAD_REQUEST);
    messageDB.content = params.content;
    return this.messageRepository.save(messageDB);
  }
}