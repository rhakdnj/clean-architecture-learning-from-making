export class Money {
  static readonly ZERO = new Money(0);

  private readonly _amount: number;

  constructor(amount: number) {
    this._amount = amount;
  }

  get amount(): number {
    return this._amount;
  }

  static of(amount: number): Money {
    return new Money(amount);
  }

  static add(a: Money, b: Money): Money {
    return new Money(a.amount + b.amount);
  }

  static subtract(a: Money, b: Money): Money {
    return new Money(a.amount - b.amount);
  }

  isPositiveOrZero(): boolean {
    return this._amount >= 0n;
  }

  isNegative(): boolean {
    return this._amount < 0n;
  }

  isPositive(): boolean {
    return this._amount > 0n;
  }

  isGreaterThanOrEqualTo(money: Money): boolean {
    return this._amount >= money.amount;
  }

  isGreaterThan(money: Money): boolean {
    return this._amount >= money.amount;
  }

  negate(): Money {
    return new Money(-this.amount);
  }

  plus(money: Money): Money {
    return new Money(this.amount + money.amount);
  }

  minus(money: Money): Money {
    return new Money(this.amount - money.amount);
  }
}
