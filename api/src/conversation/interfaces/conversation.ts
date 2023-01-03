import { User } from "src/utils/typeorm";
import { Conversation } from "src/utils/typeorm/entities/Conversation";
import { AccessParams, CreateConversationParams, GetConversationMessagesParams, UpdateConversationParams } from "src/utils/types";

export interface IConversationService {
    createConversation(
      user: User,
      conversationParams: CreateConversationParams,
    ): Promise<Conversation>;
    getConversations(id: number): Promise<Conversation[]>;
    findById(id: number): Promise<Conversation | undefined>;
    hasAccess(params: AccessParams): Promise<boolean>;
    isCreated(
      userId: number,
      recipientId: number,
    ): Promise<Conversation | undefined>;
    save(conversation: Conversation): Promise<Conversation>;
    getMessages(params: GetConversationMessagesParams): Promise<Conversation>;
    update(params: UpdateConversationParams);
  }