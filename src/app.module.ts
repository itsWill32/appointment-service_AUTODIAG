import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/modules/database.module';
import { AppointmentModule } from './infrastructure/modules/appointment.module';
import { ProgressModule } from './infrastructure/modules/progress.module';
import { ChatModule } from './infrastructure/modules/chat.module';
import { NotificationModule } from './infrastructure/modules/notification.module';
import { JwtAuthGuard } from './infrastructure/api/guards/jwt-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    AppointmentModule,
    ProgressModule,
    ChatModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}