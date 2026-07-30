import { IsString } from 'class-validator';

export class AddPhotoDto {
  @IsString()
  imageUrl: string;
}
