import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../../domain/repositories/notification.repository';
import { NotificationNotFoundException } from '../../../domain/exceptions/notification.exceptions';

@Injectable()
export class MarkNotificationReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundException(notificationId);
    }

    await this.notificationRepository.markAsRead(notificationId);
  }
}