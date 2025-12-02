import { v4 as uuidv4 } from 'uuid';

export class AppointmentId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('AppointmentId cannot be empty');
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('AppointmentId must be a valid UUID');
    }
    
    this.value = value;
  }

  static generate(): AppointmentId {
    return new AppointmentId(uuidv4());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AppointmentId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}