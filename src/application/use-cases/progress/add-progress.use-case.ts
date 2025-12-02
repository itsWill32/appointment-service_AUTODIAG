import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { AppointmentProgress } from '../../../domain/entities/appointment-progress.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { ProgressStage } from '../../../domain/value-objects/progress-stage.vo';
import { CreateProgressDto } from '../../dtos/progress/create-progress.dto';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class AddProgressUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    appointmentId: string,
    dto: CreateProgressDto,
    createdBy: string,
  ): Promise<AppointmentProgress> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    const progress = AppointmentProgress.create(
      new AppointmentId(appointmentId),
      new ProgressStage(dto.stage),
      new UserId(createdBy),
      dto.description,
      dto.photos,
      dto.estimatedCompletion ? new Date(dto.estimatedCompletion) : undefined,
    );

    appointment.addProgress(progress);

    await this.appointmentRepository.update(appointment);

    return progress;
  }
}