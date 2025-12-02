import { Module } from '@nestjs/common';
import { ProgressController } from '../api/controllers/progress.controller';
import { AddProgressUseCase } from '../../application/use-cases/progress/add-progress.use-case';
import { GetAppointmentProgressUseCase } from '../../application/use-cases/progress/get-appointment-progress.use-case';

@Module({
  controllers: [ProgressController],
  providers: [AddProgressUseCase, GetAppointmentProgressUseCase],
})
export class ProgressModule {}