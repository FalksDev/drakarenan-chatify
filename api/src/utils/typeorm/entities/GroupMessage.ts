import { Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Group } from "./Group";
import { GroupMessageAttachment } from "./GroupMessageAttachment";
import { MessageAttachment } from "./MessageAttachment";
import { BaseMessage } from "./MessageBase";

@Entity({ name: 'group_messages' })
export class GroupMessage extends BaseMessage {
  @ManyToOne(() => Group, (group) => group.messages)
  group: Group;

  @OneToMany(() => GroupMessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments?: MessageAttachment[];
}