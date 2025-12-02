export class ChatDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatDomainException';
  }
}

export class ChatMessageNotFoundException extends ChatDomainException {
  constructor(messageId: string) {
    super(`Chat message with ID ${messageId} not found`);
    this.name = 'ChatMessageNotFoundException';
  }
}

export class EmptyMessageException extends ChatDomainException {
  constructor() {
    super('Message content cannot be empty');
    this.name = 'EmptyMessageException';
  }
}

export class MessageTooLongException extends ChatDomainException {
  constructor(length: number, maxLength: number) {
    super(`Message length ${length} exceeds maximum of ${maxLength} characters`);
    this.name = 'MessageTooLongException';
  }
}

export class TooManyAttachmentsException extends ChatDomainException {
  constructor(count: number, maxCount: number) {
    super(`Number of attachments ${count} exceeds maximum of ${maxCount}`);
    this.name = 'TooManyAttachmentsException';
  }
}

export class ChatAccessDeniedException extends ChatDomainException {
  constructor(userId: string, appointmentId: string) {
    super(`User ${userId} does not have access to chat for appointment ${appointmentId}`);
    this.name = 'ChatAccessDeniedException';
  }
}