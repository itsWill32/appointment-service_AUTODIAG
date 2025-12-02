export class AppointmentResponseDto {
  id: string;
  userId: string;
  vehicleId: string;
  workshopId: string;
  diagnosisId?: string;
  serviceType: string;
  description?: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration?: number;
  status: string;
  estimatedCost?: number;
  finalCost?: number;
  cancelledAt?: string;
  cancelReason?: string;
  cancelledBy?: string;
  completedAt?: string;
  notes?: string;
  photos: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}