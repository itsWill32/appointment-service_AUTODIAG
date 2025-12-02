import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { ScheduledTime } from '../../../domain/value-objects/scheduled-time.vo';
import { UpdateAppointmentDto } from '../../dtos/appointment/update-appointment.dto';
import { AppointmentNotFoundException, AppointmentCannotBeModifiedException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string, dto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    if (!appointment.getStatus().canBeModified()) {
      throw new AppointmentCannotBeModifiedException(
        appointmentId,
        `Status is ${appointment.getStatus().toString()}`,
      );
    }

    if (dto.scheduledDate && dto.scheduledTime) {
      appointment.reschedule(
        new Date(dto.scheduledDate),
        new ScheduledTime(dto.scheduledTime),
      );
    }

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}