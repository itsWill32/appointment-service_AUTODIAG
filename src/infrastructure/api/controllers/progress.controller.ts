import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateProgressDto } from '../../../application/dtos/progress/create-progress.dto';
import { AddProgressUseCase } from '../../../application/use-cases/progress/add-progress.use-case';
import { GetAppointmentProgressUseCase } from '../../../application/use-cases/progress/get-appointment-progress.use-case';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { UserId } from '../../../domain/value-objects/user-id.vo';

@Controller('appointments/:appointmentId/progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(
    private readonly addProgressUseCase: AddProgressUseCase,
    private readonly getAppointmentProgressUseCase: GetAppointmentProgressUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addProgress(
    @Param('appointmentId') appointmentId: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateProgressDto,
  ) {
    return this.addProgressUseCase.execute(new AppointmentId(appointmentId), new UserId(userId), dto);
  }

  @Get()
  async getProgress(@Param('appointmentId') appointmentId: string) {
    return this.getAppointmentProgressUseCase.execute(new AppointmentId(appointmentId));
  }
}