import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentResponseDto } from '../dtos/appointment/appointment-response.dto';

export class AppointmentMapper {
  static toDto(appointment: Appointment): AppointmentResponseDto {
    return {
      id: appointment.getId().getValue(),
      userId: appointment.getUserId().getValue(),
      vehicleId: appointment.getVehicleId().getValue(),
      workshopId: appointment.getWorkshopId().getValue(),
      diagnosisId: appointment.getDiagnosisId(),
      serviceType: appointment.getServiceType().toString(),
      description: appointment.getDescription(),
      scheduledDate: appointment.getScheduledDate().toISOString(),
      scheduledTime: appointment.getScheduledTime().toString(),
      estimatedDuration: appointment.getEstimatedDuration(),
      status: appointment.getStatus().toString(),
      estimatedCost: appointment.getEstimatedCost()?.getAmount(),
      finalCost: appointment.getFinalCost()?.getAmount(),
      cancelledAt: appointment.getCancelledAt()?.toISOString(),
      cancelReason: appointment.getCancelReason(),
      cancelledBy: appointment.getCancelledBy(),
      completedAt: appointment.getCompletedAt()?.toISOString(),
      notes: appointment.getNotes(),
      photos: appointment.getPhotos(),
      documents: appointment.getDocuments(),
      createdAt: appointment.getCreatedAt().toISOString(),
      updatedAt: appointment.getUpdatedAt().toISOString(),
    };
  }

  static toDtoList(appointments: Appointment[]): AppointmentResponseDto[] {
    return appointments.map((appointment) => this.toDto(appointment));
  }
}