import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { AppointmentStatus } from '../../../domain/value-objects/appointment-status.vo';

@Injectable()
export class GetUserAppointmentsUseCase {
  constructor(
    @Inject('AppointmentRepository')
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(userId: string, status?: string, limit?: number): Promise<Appointment[]> {
    const userIdVo = new UserId(userId);

    if (status) {
      const statusVo = new AppointmentStatus(status);
      return this.appointmentRepository.findByUserIdAndStatus(userIdVo, statusVo);
    }

    return this.appointmentRepository.findByUserId(userIdVo, limit);
  }
}