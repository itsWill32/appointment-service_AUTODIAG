export enum AppointmentStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_PARTS = 'WAITING_PARTS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export class AppointmentStatus {
  private readonly value: AppointmentStatusEnum;

  constructor(value: string) {
    if (!Object.values(AppointmentStatusEnum).includes(value as AppointmentStatusEnum)) {
      throw new Error(`Invalid appointment status: ${value}`);
    }
    this.value = value as AppointmentStatusEnum;
  }

  static pending(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.PENDING);
  }

  static confirmed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CONFIRMED);
  }

  static inProgress(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.IN_PROGRESS);
  }

  static completed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.COMPLETED);
  }

  static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CANCELLED);
  }

  getValue(): AppointmentStatusEnum {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  isPending(): boolean {
    return this.value === AppointmentStatusEnum.PENDING;
  }

  isConfirmed(): boolean {
    return this.value === AppointmentStatusEnum.CONFIRMED;
  }

  isInProgress(): boolean {
    return this.value === AppointmentStatusEnum.IN_PROGRESS;
  }

  isCompleted(): boolean {
    return this.value === AppointmentStatusEnum.COMPLETED;
  }

  isCancelled(): boolean {
    return this.value === AppointmentStatusEnum.CANCELLED;
  }

  canBeModified(): boolean {
    return this.isPending() || this.isConfirmed();
  }

  canBeCancelled(): boolean {
    return !this.isCompleted() && !this.isCancelled();
  }
}