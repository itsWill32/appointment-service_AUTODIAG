import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationRepository } from '../../../domain/repositories/notification.repository';
import { Notification } from '../../../domain/entities/notification.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { NotificationType } from '../../../domain/value-objects/notification-type.vo';
import { NotificationType as PrismaNotificationType } from '@prisma/client';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.getId(),
        userId: notification.getUserId().getValue(),
        type: notification.getType().toString() as PrismaNotificationType,
        title: notification.getTitle(),
        message: notification.getMessage(),
        appointmentId: notification.getAppointmentId(),
        channels: notification.getChannels(),
        isRead: notification.getIsRead(),
        readAt: notification.getReadAt(),
        isSent: notification.getIsSent(),
        sentAt: notification.getSentAt(),
        metadata: notification.getMetadata() as any,
        createdAt: notification.getCreatedAt(),
        updatedAt: notification.getUpdatedAt(),
      },
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const data = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByUserId(userId: UserId, limit: number = 20): Promise<Notification[]> {
    const results = await this.prisma.notification.findMany({
      where: { userId: userId.getValue() },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return results.map((data) => this.toDomain(data));
  }

  async findUnreadByUserId(userId: UserId): Promise<Notification[]> {
    const results = await this.prisma.notification.findMany({
      where: {
        userId: userId.getValue(),
        isRead: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByType(type: NotificationType): Promise<Notification[]> {
    const results = await this.prisma.notification.findMany({
      where: { type: type.toString() as PrismaNotificationType },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async findPendingToSend(): Promise<Notification[]> {
    const results = await this.prisma.notification.findMany({
      where: { isSent: false },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });

    return results.map((data) => this.toDomain(data));
  }

  async markAsRead(id: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async markAsSent(id: string): Promise<void> {
    await this.prisma.notification.update({
      where: { id },
      data: {
        isSent: true,
        sentAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }

  private toDomain(data: any): Notification {
    const notification = new Notification(
      data.id,
      new UserId(data.userId),
      new NotificationType(data.type),
      data.title,
      data.message,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );

    if (data.appointmentId) (notification as any).appointmentId = data.appointmentId;
    if (data.channels) (notification as any).channels = data.channels;
    if (data.isRead) {
      (notification as any).isRead = data.isRead;
      if (data.readAt) (notification as any).readAt = new Date(data.readAt);
    }
    if (data.isSent) {
      (notification as any).isSent = data.isSent;
      if (data.sentAt) (notification as any).sentAt = new Date(data.sentAt);
    }
    if (data.metadata) (notification as any).metadata = data.metadata;

    return notification;
  }
}