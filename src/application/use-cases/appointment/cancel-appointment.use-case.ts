import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { CancelAppointmentDto } from '../../dtos/appointment/cancel-appointment.dto';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    appointmentId: string,
    dto: CancelAppointmentDto,
    cancelledBy: string,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    appointment.cancel(dto.reason, cancelledBy);

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}