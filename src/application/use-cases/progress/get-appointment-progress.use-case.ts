import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { AppointmentProgress } from '../../../domain/entities/appointment-progress.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class GetAppointmentProgressUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string): Promise<AppointmentProgress[]> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    return appointment.getProgress();
  }
}