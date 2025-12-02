import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../../domain/repositories/notification.repository';
import { Notification } from '../../../domain/entities/notification.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';

@Injectable()
export class GetUserNotificationsUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: string, limit?: number): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(new UserId(userId), limit);
  }
}