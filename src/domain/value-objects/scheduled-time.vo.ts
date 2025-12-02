export class ScheduledTime {
  private readonly value: string;

  constructor(value: string) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(value)) {
      throw new Error('ScheduledTime must be in format HH:MM (e.g., 14:30)');
    }
    
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  getHours(): number {
    return parseInt(this.value.split(':')[0]);
  }

  getMinutes(): number {
    return parseInt(this.value.split(':')[1]);
  }

  isBusinessHours(): boolean {
    const hours = this.getHours();
    return hours >= 8 && hours < 18; 
  }
}