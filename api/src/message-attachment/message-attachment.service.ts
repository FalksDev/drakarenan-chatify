import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IImageStorageService } from "../image-storage/interfaces/image-storage";
import { Repositories, Services } from "../utils/constants";
import { GroupMessageAttachment } from "../utils/typeorm/entities/GroupMessageAttachment";
import { MessageAttachment } from "../utils/typeorm/entities/MessageAttachment";
import { Attachment } from "../utils/types";
import { Repository } from "typeorm";
import { IMessageAttachmentService } from "./interfaces/message-attachment";

@Injectable()
export class MessageAttachmentService implements IMessageAttachmentService {
  constructor(
    @Inject(Repositories.MESSAGE_ATTACHMENT)
    private readonly attachmentRepository: Repository<MessageAttachment>,
    @Inject(Repositories.GROUP_MESSAGE_ATTACHMENT)
    private readonly groupAttachmentRepository: Repository<GroupMessageAttachment>,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageUploadService: IImageStorageService,
  ) {}
  create(attachments: Attachment[]) {
    const promise = attachments.map((attachment) => {
      const newAttachment = this.attachmentRepository.create();
      return this.attachmentRepository
        .save(newAttachment)
        .then((messageAttachment) =>
          this.imageUploadService.uploadMessageAttachment({
            messageAttachment,
            file: attachment,
          }),
        );
    });
    return Promise.all(promise);
  }

  createGroupAttachments(
    attachments: Attachment[],
  ): Promise<GroupMessageAttachment[]> {
    const promise = attachments.map((attachment) => {
      const newAttachment = this.groupAttachmentRepository.create();
      return this.groupAttachmentRepository
        .save(newAttachment)
        .then((messageAttachment) =>
          this.imageUploadService.uploadGroupMessageAttachment({
            messageAttachment,
            file: attachment,
          }),
        );
    });
    return Promise.all(promise);
  }

  deleteAllAttachments(attachments: MessageAttachment[]) {
    const promise = attachments.map((attachment) =>
      this.attachmentRepository.delete(attachment.key),
    );
    return Promise.all(promise);
  }
}