import { IsString, IsUrl } from 'class-validator';

export class AddDocumentDto {
  @IsString()
  @IsUrl()
  documentUrl: string;
}