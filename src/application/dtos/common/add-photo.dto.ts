import { IsString, IsUrl } from 'class-validator';

export class AddPhotoDto {
  @IsString()
  @IsUrl()
  photoUrl: string;
}