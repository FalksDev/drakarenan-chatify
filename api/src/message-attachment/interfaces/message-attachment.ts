import { GroupMessageAttachment } from "../../utils/typeorm/entities/GroupMessageAttachment";
import { MessageAttachment } from "../../utils/typeorm/entities/MessageAttachment";
import { Attachment } from "../../utils/types";

export interface IMessageAttachmentService {
    create(attachments: Attachment[]): Promise<MessageAttachment[]>;
    createGroupAttachments(
      attachments: Attachment[],
    ): Promise<GroupMessageAttachment[]>;
    deleteAllAttachments(attachments: MessageAttachment[]);
  }