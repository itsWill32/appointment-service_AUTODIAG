export class NotificationResponseDto {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  appointmentId?: string;
  channels: string[];
  isRead: boolean;
  readAt?: string;
  isSent: boolean;
  sentAt?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}