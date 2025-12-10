import { Module } from '@nestjs/common';
import { AppointmentController } from '../api/controllers/appointment.controller';
import { StatsController } from '../api/controllers/stats.controller';
import { CreateAppointmentUseCase } from '../../application/use-cases/appointment/create-appointment.use-case';
import { GetAppointmentByIdUseCase } from '../../application/use-cases/appointment/get-appointment-by-id.use-case';
import { GetUserAppointmentsUseCase } from '../../application/use-cases/appointment/get-user-appointments.use-case';
import { UpdateAppointmentUseCase } from '../../application/use-cases/appointment/update-appointment.use-case';
import { CancelAppointmentUseCase } from '../../application/use-cases/appointment/cancel-appointment.use-case';
import { CompleteAppointmentUseCase } from '../../application/use-cases/appointment/complete-appointment.use-case';
import { ConfirmAppointmentUseCase } from '../../application/use-cases/appointment/confirm-appointment.use-case';

@Module({
  controllers: [AppointmentController, StatsController],
  providers: [
    CreateAppointmentUseCase,
    GetAppointmentByIdUseCase,
    GetUserAppointmentsUseCase,
    UpdateAppointmentUseCase,
    CancelAppointmentUseCase,
    CompleteAppointmentUseCase,
    ConfirmAppointmentUseCase,
  ],
})
export class AppointmentModule { }