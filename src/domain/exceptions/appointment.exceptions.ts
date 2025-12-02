export class AppointmentDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentDomainException';
  }
}

export class AppointmentNotFoundException extends AppointmentDomainException {
  constructor(appointmentId: string) {
    super(`Appointment with ID ${appointmentId} not found`);
    this.name = 'AppointmentNotFoundException';
  }
}

export class AppointmentNotOwnedException extends AppointmentDomainException {
  constructor(appointmentId: string, userId: string) {
    super(`User ${userId} does not own appointment ${appointmentId}`);
    this.name = 'AppointmentNotOwnedException';
  }
}

export class InvalidAppointmentStatusException extends AppointmentDomainException {
  constructor(currentStatus: string, targetStatus: string) {
    super(`Cannot transition from ${currentStatus} to ${targetStatus}`);
    this.name = 'InvalidAppointmentStatusException';
  }
}

export class AppointmentCannotBeModifiedException extends AppointmentDomainException {
  constructor(appointmentId: string, reason: string) {
    super(`Appointment ${appointmentId} cannot be modified: ${reason}`);
    this.name = 'AppointmentCannotBeModifiedException';
  }
}

export class AppointmentCannotBeCancelledException extends AppointmentDomainException {
  constructor(appointmentId: string, reason: string) {
    super(`Appointment ${appointmentId} cannot be cancelled: ${reason}`);
    this.name = 'AppointmentCannotBeCancelledException';
  }
}

export class AppointmentSlotNotAvailableException extends AppointmentDomainException {
  constructor(workshopId: string, date: Date, time: string) {
    super(`Workshop ${workshopId} is not available on ${date.toISOString()} at ${time}`);
    this.name = 'AppointmentSlotNotAvailableException';
  }
}

export class DuplicateAppointmentException extends AppointmentDomainException {
  constructor(userId: string, workshopId: string, date: Date) {
    super(`User ${userId} already has an appointment with workshop ${workshopId} on ${date.toISOString()}`);
    this.name = 'DuplicateAppointmentException';
  }
}

export class InvalidScheduledTimeException extends AppointmentDomainException {
  constructor(time: string, reason: string) {
    super(`Invalid scheduled time ${time}: ${reason}`);
    this.name = 'InvalidScheduledTimeException';
  }
}

export class PastDateAppointmentException extends AppointmentDomainException {
  constructor(date: Date) {
    super(`Cannot schedule appointment in the past: ${date.toISOString()}`);
    this.name = 'PastDateAppointmentException';
  }
}