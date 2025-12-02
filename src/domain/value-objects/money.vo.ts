export class Money {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number, currency: string = 'MXN') {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
    
    if (!currency || currency.length !== 3) {
      throw new Error('Currency must be a 3-letter code (e.g., MXN, USD)');
    }
    
    this.amount = Math.round(amount * 100) / 100; 
    this.currency = currency.toUpperCase();
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  toString(): string {
    return `${this.currency} $${this.amount.toFixed(2)}`;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('No puedes sumar dinero con diferentes monedas');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}