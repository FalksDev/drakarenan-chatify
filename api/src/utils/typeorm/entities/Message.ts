import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Conversation } from "./Conversation";
import { MessageAttachment } from "./MessageAttachment";
import { BaseMessage } from "./MessageBase";

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments: MessageAttachment[];
}