import { AppointmentProgress } from '../../domain/entities/appointment-progress.entity';
import { ProgressResponseDto } from '../dtos/progress/progress-response.dto';

export class ProgressMapper {
  static toDto(progress: AppointmentProgress): ProgressResponseDto {
    return {
      id: progress.getId(),
      appointmentId: progress.getAppointmentId().getValue(),
      stage: progress.getStage().toString(),
      description: progress.getDescription(),
      photos: progress.getPhotos(),
      estimatedCompletion: progress.getEstimatedCompletion()?.toISOString(),
      createdBy: progress.getCreatedBy().getValue(),
      createdAt: progress.getCreatedAt().toISOString(),
    };
  }

  static toDtoList(progressList: AppointmentProgress[]): ProgressResponseDto[] {
    return progressList.map((progress) => this.toDto(progress));
  }
}