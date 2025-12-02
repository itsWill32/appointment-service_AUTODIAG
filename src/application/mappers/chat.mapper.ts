import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ChatMessageResponseDto } from '../dtos/chat/chat-message-response.dto';

export class ChatMapper {
  static toDto(message: ChatMessage): ChatMessageResponseDto {
    return {
      id: message.getId(),
      appointmentId: message.getAppointmentId().getValue(),
      senderId: message.getSenderId().getValue(),
      senderRole: message.getSenderRole(),
      message: message.getMessage(),
      attachments: message.getAttachments(),
      isRead: message.getIsRead(),
      readAt: message.getReadAt()?.toISOString(),
      createdAt: message.getCreatedAt().toISOString(),
    };
  }

  static toDtoList(messages: ChatMessage[]): ChatMessageResponseDto[] {
    return messages.map((message) => this.toDto(message));
  }
}