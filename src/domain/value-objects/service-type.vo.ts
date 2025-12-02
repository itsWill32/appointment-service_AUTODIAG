export enum ServiceTypeEnum {
  OIL_CHANGE = 'OIL_CHANGE',
  TIRE_ROTATION = 'TIRE_ROTATION',
  BRAKE_INSPECTION = 'BRAKE_INSPECTION',
  BRAKE_REPLACEMENT = 'BRAKE_REPLACEMENT',
  FILTER_REPLACEMENT = 'FILTER_REPLACEMENT',
  BATTERY_REPLACEMENT = 'BATTERY_REPLACEMENT',
  ALIGNMENT = 'ALIGNMENT',
  TRANSMISSION_SERVICE = 'TRANSMISSION_SERVICE',
  COOLANT_FLUSH = 'COOLANT_FLUSH',
  ENGINE_TUNEUP = 'ENGINE_TUNEUP',
  INSPECTION = 'INSPECTION',
  OTHER = 'OTHER',
}

export class ServiceType {
  private readonly value: ServiceTypeEnum;

  constructor(value: string) {
    if (!Object.values(ServiceTypeEnum).includes(value as ServiceTypeEnum)) {
      throw new Error(`Invalid service type: ${value}`);
    }
    this.value = value as ServiceTypeEnum;
  }

  getValue(): ServiceTypeEnum {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: ServiceType): boolean {
    return this.value === other.value;
  }
}