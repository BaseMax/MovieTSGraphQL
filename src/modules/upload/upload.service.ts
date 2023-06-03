import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import * as sharp from 'sharp';
import * as cuid from 'cuid';
import { sizes } from './config';

interface UploadInput {
  image: Buffer;
  name: string;
}

interface SizedUploadInput extends UploadInput {
  bucket: string;
  width: number;
  height: number;
}

@Injectable()
export class UploadService {

  constructor(@InjectS3() private readonly s3: S3) { }
  async uploadAvatar(input: UploadInput) {
    return await this.uploadImageSized({ ...input, ...sizes.avatar, bucket: "avatars" });
  }

  async uploadGalleryImage(input: UploadInput) {
    return await this.uploadImageSized({ ...input, ...sizes.gallery, bucket: "gallery" });
  }

  async uploadPoster(input: UploadInput) {
    return await this.uploadImageSized({ ...input, ...sizes.poster, bucket: "poster" });
  }

  async uploadBackdrop(input: UploadInput) {
    return await this.uploadImageSized({ ...input, ...sizes.poster, bucket: "backdrops" });
  }



  private async uploadImageSized({ image, width, height, name, bucket }: SizedUploadInput) {
    const resized = await this.resizeAndFormat(image, width, height);

    const key = this.getKey(name);

    await this.s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: resized
    });

    return `/${bucket}/${key}`;
  }

  private getKey(name: string) {
    return `${name}-${cuid()}.jpeg`;
  }

  private async resizeAndFormat(image: Buffer, width: number, height: number) {
    try {
      return await sharp(image).resize(width, height).jpeg().toBuffer();
    } catch {
      throw new BadRequestException("invalid image");
    }
  }
}
