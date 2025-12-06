import { Injectable, Inject } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class ConfirmAppointmentUseCase {
  constructor(
    @Inject('AppointmentRepository')
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(appointmentId: string): Promise<Appointment> {
    const idVo = new AppointmentId(appointmentId);
    
    const appointment = await this.appointmentRepository.findById(idVo);

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    appointment.confirm();

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}