import { S3 } from "@aws-sdk/client-s3";
import { Inject, Injectable } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { compressImage } from "src/utils/helpers";
import { GroupMessageAttachment } from "src/utils/typeorm/entities/GroupMessageAttachment";
import { UploadGroupMessageAttachmentParams, UploadImageParams, UploadMessageAttachmentParams } from "src/utils/types";
import { IImageStorageService } from "./interfaces/image-storage";

@Injectable()
export class ImageStorageService implements IImageStorageService {
  constructor(
    @Inject(Services.SPACE_CLIENT)
    private readonly spacesClient: S3,
  ) {}

  upload(params: UploadImageParams) {
    return this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: params.key,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
  }

  async uploadMessageAttachment(params: UploadMessageAttachmentParams) {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }

  async uploadGroupMessageAttachment(
    params: UploadGroupMessageAttachmentParams,
  ): Promise<GroupMessageAttachment> {
    this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `original/${params.messageAttachment.key}`,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: `preview/${params.messageAttachment.key}`,
      Body: await compressImage(params.file),
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }
}