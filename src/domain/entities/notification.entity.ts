import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../value-objects/user-id.vo';
import { NotificationType } from '../value-objects/notification-type.vo';

export class Notification {
  private readonly id: string;
  private readonly userId: UserId;
  private readonly type: NotificationType;
  private title: string;
  private message: string;
  private appointmentId?: string;
  private channels: string[] = [];
  private isRead: boolean = false;
  private readAt?: Date;
  private isSent: boolean = false;
  private sentAt?: Date;
  private metadata?: Record<string, any>;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    userId: UserId,
    type: NotificationType,
    title: string,
    message: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.title = title;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    userId: UserId,
    type: NotificationType,
    title: string,
    message: string,
    channels: string[] = ['push'],
    appointmentId?: string,
    metadata?: Record<string, any>,
  ): Notification {
    if (!title || title.trim().length === 0) {
      throw new Error('Notification title cannot be empty');
    }
    
    if (!message || message.trim().length === 0) {
      throw new Error('Notification message cannot be empty');
    }
    
    const notification = new Notification(
      uuidv4(),
      userId,
      type,
      title,
      message,
      new Date(),
      new Date(),
    );
    
    notification.channels = channels;
    notification.appointmentId = appointmentId;
    notification.metadata = metadata;
    
    return notification;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getType(): NotificationType {
    return this.type;
  }

  getTitle(): string {
    return this.title;
  }

  getMessage(): string {
    return this.message;
  }

  getAppointmentId(): string | undefined {
    return this.appointmentId;
  }

  getChannels(): string[] {
    return [...this.channels];
  }

  getIsRead(): boolean {
    return this.isRead;
  }

  getReadAt(): Date | undefined {
    return this.readAt;
  }

  getIsSent(): boolean {
    return this.isSent;
  }

  getSentAt(): Date | undefined {
    return this.sentAt;
  }

  getMetadata(): Record<string, any> | undefined {
    return this.metadata;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  markAsRead(): void {
    this.isRead = true;
    this.readAt = new Date();
    this.updatedAt = new Date();
  }

  markAsSent(): void {
    this.isSent = true;
    this.sentAt = new Date();
    this.updatedAt = new Date();
  }
}