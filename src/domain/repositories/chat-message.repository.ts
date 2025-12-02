import { ChatMessage } from '../entities/chat-message.entity';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';

export interface ChatMessageRepository {
  save(message: ChatMessage): Promise<void>;
  
  findById(id: string): Promise<ChatMessage | null>;
  findByAppointmentId(appointmentId: AppointmentId, limit?: number): Promise<ChatMessage[]>;
  findUnreadByUserId(userId: UserId): Promise<ChatMessage[]>;
  countUnreadByAppointment(appointmentId: AppointmentId, userId: UserId): Promise<number>;
  
  markAsRead(messageId: string): Promise<void>;
  markAllAsReadByAppointment(appointmentId: AppointmentId, userId: UserId): Promise<void>;
  
  delete(id: string): Promise<void>;
}