export enum NotificationTypeEnum {
  APPOINTMENT_CONFIRMED = 'APPOINTMENT_CONFIRMED',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  APPOINTMENT_STARTED = 'APPOINTMENT_STARTED',
  APPOINTMENT_PROGRESS = 'APPOINTMENT_PROGRESS',
  APPOINTMENT_COMPLETED = 'APPOINTMENT_COMPLETED',
  APPOINTMENT_CANCELLED = 'APPOINTMENT_CANCELLED',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  REVIEW_REQUEST = 'REVIEW_REQUEST',
}

export class NotificationType {
  private readonly value: NotificationTypeEnum;

  constructor(value: string) {
    if (!Object.values(NotificationTypeEnum).includes(value as NotificationTypeEnum)) {
      throw new Error(`Invalid notification type: ${value}`);
    }
    this.value = value as NotificationTypeEnum;
  }

  getValue(): NotificationTypeEnum {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}