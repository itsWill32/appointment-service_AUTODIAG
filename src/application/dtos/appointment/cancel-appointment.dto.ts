import { IsString, MinLength, MaxLength } from 'class-validator';

export class CancelAppointmentDto {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  reason: string;
}