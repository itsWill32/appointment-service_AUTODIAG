import { IsString, MinLength, MaxLength, IsArray, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  message: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}