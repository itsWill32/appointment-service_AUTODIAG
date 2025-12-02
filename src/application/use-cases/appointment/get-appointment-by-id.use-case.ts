import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class GetAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    return appointment;
  }
}