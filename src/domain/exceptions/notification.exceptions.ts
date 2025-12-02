export class NotificationDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotificationDomainException';
  }
}

export class NotificationNotFoundException extends NotificationDomainException {
  constructor(notificationId: string) {
    super(`Notification with ID ${notificationId} not found`);
    this.name = 'NotificationNotFoundException';
  }
}

export class EmptyNotificationTitleException extends NotificationDomainException {
  constructor() {
    super('Notification title cannot be empty');
    this.name = 'EmptyNotificationTitleException';
  }
}

export class EmptyNotificationMessageException extends NotificationDomainException {
  constructor() {
    super('Notification message cannot be empty');
    this.name = 'EmptyNotificationMessageException';
  }
}

export class InvalidNotificationChannelException extends NotificationDomainException {
  constructor(channel: string) {
    super(`Invalid notification channel: ${channel}`);
    this.name = 'InvalidNotificationChannelException';
  }
}

export class NotificationAlreadySentException extends NotificationDomainException {
  constructor(notificationId: string) {
    super(`Notification ${notificationId} has already been sent`);
    this.name = 'NotificationAlreadySentException';
  }
}