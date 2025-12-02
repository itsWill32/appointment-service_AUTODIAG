import { IsNumber, Min, IsString, IsOptional, MaxLength } from 'class-validator';

export class CompleteAppointmentDto {
  @IsNumber()
  @Min(0)
  finalCost: number;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;
}