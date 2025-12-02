import { Notification } from '../entities/notification.entity';
import { UserId } from '../value-objects/user-id.vo';
import { NotificationType } from '../value-objects/notification-type.vo';

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  
  findById(id: string): Promise<Notification | null>;
  findByUserId(userId: UserId, limit?: number): Promise<Notification[]>;
  findUnreadByUserId(userId: UserId): Promise<Notification[]>;
  findByType(type: NotificationType): Promise<Notification[]>;
  findPendingToSend(): Promise<Notification[]>;
  
  markAsRead(id: string): Promise<void>;
  markAsSent(id: string): Promise<void>;
  
  
  delete(id: string): Promise<void>;
}