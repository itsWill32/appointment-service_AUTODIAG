export class ProgressResponseDto {
  id: string;
  appointmentId: string;
  stage: string;
  description?: string;
  photos: string[];
  estimatedCompletion?: string;
  createdBy: string;
  createdAt: string;
}