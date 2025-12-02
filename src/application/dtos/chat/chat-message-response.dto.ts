export class ChatMessageResponseDto {
  id: string;
  appointmentId: string;
  senderId: string;
  senderRole: string;
  message: string;
  attachments: string[];
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}