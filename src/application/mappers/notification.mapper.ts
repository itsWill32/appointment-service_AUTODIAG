import { Notification } from '../../domain/entities/notification.entity';
import { NotificationResponseDto } from '../dtos/notification/notification-response.dto';

export class NotificationMapper {
  static toDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.getId(),
      userId: notification.getUserId().getValue(),
      type: notification.getType().toString(),
      title: notification.getTitle(),
      message: notification.getMessage(),
      appointmentId: notification.getAppointmentId(),
      channels: notification.getChannels(),
      isRead: notification.getIsRead(),
      readAt: notification.getReadAt()?.toISOString(),
      isSent: notification.getIsSent(),
      sentAt: notification.getSentAt()?.toISOString(),
      metadata: notification.getMetadata(),
      createdAt: notification.getCreatedAt().toISOString(),
      updatedAt: notification.getUpdatedAt().toISOString(),
    };
  }

  static toDtoList(notifications: Notification[]): NotificationResponseDto[] {
    return notifications.map((notification) => this.toDto(notification));
  }
}