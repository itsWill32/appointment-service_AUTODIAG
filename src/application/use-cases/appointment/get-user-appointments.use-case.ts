import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { AppointmentStatus } from '../../../domain/value-objects/appointment-status.vo';
import { WorkshopId } from '../../../domain/value-objects/workshop-id.vo';

@Injectable()
export class GetUserAppointmentsUseCase {
  constructor(
    @Inject('AppointmentRepository')
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(
    userId: string, 
    role: string, 
    status?: string, 
    limit?: number,
    workshopId?: string
  ): Promise<Appointment[]> {
    
    if (role === 'VEHICLE_OWNER') {
      const userIdVo = new UserId(userId);
      if (status) {
        return this.appointmentRepository.findByUserIdAndStatus(userIdVo, new AppointmentStatus(status));
      }
      return this.appointmentRepository.findByUserId(userIdVo, limit);
    }

    if (role === 'WORKSHOP_ADMIN') {
      if (!workshopId) {
        return []; 
      }

      const workshopVo = new WorkshopId(workshopId);
      if (status) {
        return this.appointmentRepository.findByWorkshopIdAndStatus(workshopVo, new AppointmentStatus(status));
      }
      return this.appointmentRepository.findByWorkshopId(workshopVo, limit);
    }

    return [];
  }
}