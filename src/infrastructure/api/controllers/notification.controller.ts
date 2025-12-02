import { Controller, Get, Post, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GetUserNotificationsUseCase } from '../../../application/use-cases/notification/get-user-notifications.use-case';
import { MarkNotificationReadUseCase } from '../../../application/use-cases/notification/mark-notification-read.use-case';
import { UserId } from '../../../domain/value-objects/user-id.vo';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly getUserNotificationsUseCase: GetUserNotificationsUseCase,
    private readonly markNotificationReadUseCase: MarkNotificationReadUseCase,
  ) {}

  @Get()
  async getNotifications(
    @CurrentUser('sub') userId: string,
    @Query('limit') limit?: number,
  ) {
    return this.getUserNotificationsUseCase.execute(new UserId(userId), limit || 20);
  }

  @Post(':id/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(@Param('id') notificationId: string) {
    return this.markNotificationReadUseCase.execute(notificationId);
  }
}