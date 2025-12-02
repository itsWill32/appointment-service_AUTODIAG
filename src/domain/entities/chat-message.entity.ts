import { v4 as uuidv4 } from 'uuid';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';

export class ChatMessage {
  private readonly id: string;
  private readonly appointmentId: AppointmentId;
  private readonly senderId: UserId;
  private readonly senderRole: string;
  private message: string;
  private attachments: string[] = [];
  private isRead: boolean = false;
  private readAt?: Date;
  private readonly createdAt: Date;

  constructor(
    id: string,
    appointmentId: AppointmentId,
    senderId: UserId,
    senderRole: string,
    message: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.senderId = senderId;
    this.senderRole = senderRole;
    this.message = message;
    this.createdAt = createdAt;
  }

  static create(
    appointmentId: AppointmentId,
    senderId: UserId,
    senderRole: string,
    message: string,
    attachments?: string[],
  ): ChatMessage {
    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }
    
    if (message.length > 2000) {
      throw new Error('Message cannot exceed 2000 characters');
    }
    
    const chatMessage = new ChatMessage(
      uuidv4(),
      appointmentId,
      senderId,
      senderRole,
      message,
      new Date(),
    );
    
    chatMessage.attachments = attachments || [];
    
    return chatMessage;
  }

  getId(): string {
    return this.id;
  }

  getAppointmentId(): AppointmentId {
    return this.appointmentId;
  }

  getSenderId(): UserId {
    return this.senderId;
  }

  getSenderRole(): string {
    return this.senderRole;
  }

  getMessage(): string {
    return this.message;
  }

  getAttachments(): string[] {
    return [...this.attachments];
  }

  getIsRead(): boolean {
    return this.isRead;
  }

  getReadAt(): Date | undefined {
    return this.readAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  markAsRead(): void {
    this.isRead = true;
    this.readAt = new Date();
  }

  addAttachment(attachmentUrl: string): void {
    if (!attachmentUrl || attachmentUrl.trim().length === 0) {
      throw new Error('Attachment URL cannot be empty');
    }
    
    if (this.attachments.length >= 3) {
      throw new Error('Cannot add more than 3 attachments per message');
    }
    
    this.attachments.push(attachmentUrl);
  }
}