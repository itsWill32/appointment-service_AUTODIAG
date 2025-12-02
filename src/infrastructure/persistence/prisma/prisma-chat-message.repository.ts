import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChatMessageRepository } from '../../../domain/repositories/chat-message.repository';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { UserId } from '../../../domain/value-objects/user-id.vo';

@Injectable()
export class PrismaChatMessageRepository implements ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(message: ChatMessage): Promise<void> {
    await this.prisma.chatMessage.create({
      data: {
        id: message.getId(),
        appointmentId: message.getAppointmentId().getValue(),
        senderId: message.getSenderId().getValue(),
        senderRole: message.getSenderRole(),
        message: message.getMessage(),
        attachments: message.getAttachments(),
        isRead: message.getIsRead(),
        readAt: message.getReadAt(),
        createdAt: message.getCreatedAt(),
      },
    });
  }

  async findById(id: string): Promise<ChatMessage | null> {
    const data = await this.prisma.chatMessage.findUnique({
      where: { id },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByAppointmentId(appointmentId: AppointmentId, limit: number = 50): Promise<ChatMessage[]> {
    const results = await this.prisma.chatMessage.findMany({
      where: { appointmentId: appointmentId.getValue() },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return results.map((data) => this.toDomain(data));
  }

  async findUnreadByUserId(userId: UserId): Promise<ChatMessage[]> {
    const results = await this.prisma.chatMessage.findMany({
      where: {
        isRead: false,
        senderId: { not: userId.getValue() },
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async countUnreadByAppointment(appointmentId: AppointmentId, userId: UserId): Promise<number> {
    return this.prisma.chatMessage.count({
      where: {
        appointmentId: appointmentId.getValue(),
        senderId: { not: userId.getValue() },
        isRead: false,
      },
    });
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.prisma.chatMessage.update({
      where: { id: messageId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsReadByAppointment(appointmentId: AppointmentId, userId: UserId): Promise<void> {
    await this.prisma.chatMessage.updateMany({
      where: {
        appointmentId: appointmentId.getValue(),
        senderId: { not: userId.getValue() },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.chatMessage.delete({
      where: { id },
    });
  }

  private toDomain(data: any): ChatMessage {
    const message = new ChatMessage(
      data.id,
      new AppointmentId(data.appointmentId),
      new UserId(data.senderId),
      data.senderRole,
      data.message,
      new Date(data.createdAt),
    );

    if (data.attachments) (message as any).attachments = data.attachments;
    if (data.isRead) {
      (message as any).isRead = data.isRead;
      if (data.readAt) (message as any).readAt = new Date(data.readAt);
    }

    return message;
  }
}