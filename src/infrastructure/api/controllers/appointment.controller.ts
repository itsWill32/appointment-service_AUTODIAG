import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateAppointmentDto } from '../../../application/dtos/appointment/create-appointment.dto';
import { UpdateAppointmentDto } from '../../../application/dtos/appointment/update-appointment.dto';
import { CancelAppointmentDto } from '../../../application/dtos/appointment/cancel-appointment.dto';
import { CompleteAppointmentDto } from '../../../application/dtos/common/complete-appointment.dto';
import { QueryParamsDto } from '../../../application/dtos/common/query-params.dto';
import { CreateAppointmentUseCase } from '../../../application/use-cases/appointment/create-appointment.use-case';
import { GetAppointmentByIdUseCase } from '../../../application/use-cases/appointment/get-appointment-by-id.use-case';
import { GetUserAppointmentsUseCase } from '../../../application/use-cases/appointment/get-user-appointments.use-case';
import { UpdateAppointmentUseCase } from '../../../application/use-cases/appointment/update-appointment.use-case';
import { CancelAppointmentUseCase } from '../../../application/use-cases/appointment/cancel-appointment.use-case';
import { CompleteAppointmentUseCase } from '../../../application/use-cases/appointment/complete-appointment.use-case';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getAppointmentByIdUseCase: GetAppointmentByIdUseCase,
    private readonly getUserAppointmentsUseCase: GetUserAppointmentsUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly completeAppointmentUseCase: CompleteAppointmentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@CurrentUser('sub') userId: string, @Body() dto: CreateAppointmentDto) {
    return this.createAppointmentUseCase.execute(new UserId(userId), dto);
  }

  @Get()
  async getUserAppointments(
    @CurrentUser('sub') userId: string,
    @Query() query: QueryParamsDto,
  ) {
    return this.getUserAppointmentsUseCase.execute(new UserId(userId), query.status, query.limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getAppointmentByIdUseCase.execute(new AppointmentId(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.updateAppointmentUseCase.execute(new AppointmentId(id), new UserId(userId), dto);
  }

  @Post(':id/cancel')
  async cancel(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: CancelAppointmentDto,
  ) {
    return this.cancelAppointmentUseCase.execute(new AppointmentId(id), new UserId(userId), dto.reason);
  }

  @Post(':id/complete')
  async complete(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: CompleteAppointmentDto,
  ) {
    return this.completeAppointmentUseCase.execute(
      new AppointmentId(id),
      new UserId(userId),
      dto.finalCost,
      dto.notes,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return { message: 'Delete not implemented yet' };
  }
}