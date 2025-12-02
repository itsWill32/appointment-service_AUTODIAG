import { Module } from '@nestjs/common';
import { NotificationController } from '../api/controllers/notification.controller';
import { GetUserNotificationsUseCase } from '../../application/use-cases/notification/get-user-notifications.use-case';
import { MarkNotificationReadUseCase } from '../../application/use-cases/notification/mark-notification-read.use-case';

@Module({
  controllers: [NotificationController],
  providers: [GetUserNotificationsUseCase, MarkNotificationReadUseCase],
})
export class NotificationModule {}