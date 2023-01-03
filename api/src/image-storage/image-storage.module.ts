import { S3 } from "@aws-sdk/client-s3";
import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { ImageStorageService } from "./image-storage.service";

@Module({
    providers: [
      {
        provide: Services.SPACE_CLIENT,
        useValue: new S3({
          credentials: {
            accessKeyId: process.env.SPACES_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY,
          },
          endpoint: 'https://chatifyimagestorage.fra1.digitaloceanspaces.com',
          region: 'fra1',
        }),
      },
      {
        provide: Services.IMAGE_UPLOAD_SERVICE,
        useClass: ImageStorageService,
      },
    ],
    exports: [
      {
        provide: Services.SPACE_CLIENT,
        useValue: new S3({
          credentials: {
            accessKeyId: process.env.SPACES_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY,
          },
          endpoint: 'https://chatifyimagestorage.fra1.digitaloceanspaces.com',
          region: 'fra1',
        }),
      },
      {
        provide: Services.IMAGE_UPLOAD_SERVICE,
        useClass: ImageStorageService,
      },
    ],
  })
  export class ImageStorageModule {}