import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { VehicleId } from '../../../domain/value-objects/vehicle-id.vo';
import { WorkshopId } from '../../../domain/value-objects/workshop-id.vo';
import { ServiceType } from '../../../domain/value-objects/service-type.vo';
import { ScheduledTime } from '../../../domain/value-objects/scheduled-time.vo';
import { Money } from '../../../domain/value-objects/money.vo';
import { CreateAppointmentDto } from '../../dtos/appointment/create-appointment.dto';
import { DuplicateAppointmentException, PastDateAppointmentException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(dto: CreateAppointmentDto, userId: string): Promise<Appointment> {
    const scheduledDate = new Date(dto.scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (scheduledDate < today) {
      throw new PastDateAppointmentException(scheduledDate);
    }

    const userIdVo = new UserId(userId);
    const workshopIdVo = new WorkshopId(dto.workshopId);
    
    const exists = await this.appointmentRepository.existsForUserAndWorkshop(
      userIdVo,
      workshopIdVo,
      scheduledDate,
    );
    
    if (exists) {
      throw new DuplicateAppointmentException(userId, dto.workshopId, scheduledDate);
    }

    const appointment = Appointment.create(
      userIdVo,
      new VehicleId(dto.vehicleId),
      workshopIdVo,
      new ServiceType(dto.serviceType),
      scheduledDate,
      new ScheduledTime(dto.scheduledTime),
      dto.description,
      dto.diagnosisId,
    );

    if (dto.estimatedDuration) {
      appointment.setEstimatedDuration(dto.estimatedDuration);
    }

    if (dto.estimatedCost) {
      appointment.setEstimatedCost(new Money(dto.estimatedCost));
    }

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}