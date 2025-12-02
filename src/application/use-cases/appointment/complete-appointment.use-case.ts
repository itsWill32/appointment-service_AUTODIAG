import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { Money } from '../../../domain/value-objects/money.vo';
import { CompleteAppointmentDto } from '../../dtos/common/complete-appointment.dto';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class CompleteAppointmentUseCase {
  constructor(
    @Inject('AppointmentRepository')
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(appointmentId: string, dto: CompleteAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    appointment.complete(new Money(dto.finalCost), dto.notes);

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}