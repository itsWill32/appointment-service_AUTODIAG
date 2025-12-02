import { v4 as uuidv4 } from 'uuid';

export class VehicleId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('VehicleId cannot be empty');
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('VehicleId must be a valid UUID');
    }
    
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}