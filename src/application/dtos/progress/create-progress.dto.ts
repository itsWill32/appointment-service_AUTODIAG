import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  stage: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  photos?: string[];

  @IsDateString()
  @IsOptional()
  estimatedCompletion?: string;
}