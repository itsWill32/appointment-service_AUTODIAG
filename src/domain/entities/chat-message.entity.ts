import { v4 as uuidv4 } from 'uuid';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';

export class ChatMessage {
  private readonly _id: string; 
  private readonly _appointmentId: AppointmentId;
  private readonly _senderId: UserId;
  private readonly _senderRole: string;
  private _message: string;
  private _attachments: string[] = [];
  private _isRead: boolean = false;
  private _readAt?: Date;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    appointmentId: AppointmentId,
    senderId: UserId,
    senderRole: string,
    message: string,
    createdAt: Date,
  ) {
    this._id = id;
    this._appointmentId = appointmentId;
    this._senderId = senderId;
    this._senderRole = senderRole;
    this._message = message;
    this._createdAt = createdAt;
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
    
    chatMessage._attachments = attachments || [];
    
    return chatMessage;
  }

  get id(): string { return this._id; }
  get appointmentId(): AppointmentId { return this._appointmentId; }
  get senderId(): UserId { return this._senderId; }
  get senderRole(): string { return this._senderRole; }
  get message(): string { return this._message; }
  get attachments(): string[] { return [...this._attachments]; }
  get isRead(): boolean { return this._isRead; }
  get readAt(): Date | undefined { return this._readAt; }
  get createdAt(): Date { return this._createdAt; }

  getId(): string {
    return this._id;
  }

  getAppointmentId(): AppointmentId {
    return this._appointmentId;
  }

  getSenderId(): UserId {
    return this._senderId;
  }

  getSenderRole(): string {
    return this._senderRole;
  }

  getMessage(): string {
    return this._message;
  }

  getAttachments(): string[] {
    return [...this._attachments];
  }

  getIsRead(): boolean {
    return this._isRead;
  }

  getReadAt(): Date | undefined {
    return this._readAt;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  markAsRead(): void {
    this._isRead = true;
    this._readAt = new Date();
  }

  addAttachment(attachmentUrl: string): void {
    if (!attachmentUrl || attachmentUrl.trim().length === 0) {
      throw new Error('Attachment URL cannot be empty');
    }

    if (this._attachments.length >= 3) {
      throw new Error('Cannot add more than 3 attachments per message');
    }

    this._attachments.push(attachmentUrl);
  }

  toJSON() {
    return {
      id: this._id,
      appointmentId: this._appointmentId.getValue(),
      senderId: this._senderId.getValue(),
      senderRole: this._senderRole,
      message: this._message,
      attachments: this._attachments,
      isRead: this._isRead,
      readAt: this._readAt,
      createdAt: this._createdAt,
    };
  }
}