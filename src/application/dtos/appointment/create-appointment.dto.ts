import { IsString, IsUUID, IsOptional, IsDateString, Matches, IsNumber, Min } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  vehicleId: string;

  @IsUUID()
  workshopId: string;

  @IsUUID()
  @IsOptional()
  diagnosisId?: string;

  @IsString()
  serviceType: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  scheduledDate: string; 

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  scheduledTime: string; 

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedDuration?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedCost?: number;
}