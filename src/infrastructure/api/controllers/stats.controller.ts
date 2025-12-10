import { Controller, Get, HttpCode, HttpStatus, SetMetadata } from '@nestjs/common';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Inject } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('stats')
export class StatsController {
    constructor(
        @Inject('AppointmentRepository')
        private readonly appointmentRepository: AppointmentRepository,
    ) { }

    @Public()
    @Get('count')
    @HttpCode(HttpStatus.OK)
    async getTotalCount() {
        const count = await this.appointmentRepository.count();
        return { total: count };
    }
}
