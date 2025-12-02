import { IsDateString, IsOptional, Matches, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDateString()
  @IsOptional()
  scheduledDate?: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  @IsOptional()
  scheduledTime?: string;

  @IsString()
  @IsOptional()
  description?: string;
}