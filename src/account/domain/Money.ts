export class Money {
  static readonly ZERO = new Money(0n);

  readonly #amount: bigint;

  constructor(amount: bigint) {
    this.#amount = amount;
  }

  get amount(): bigint {
    return this.#amount;
  }

  static of(amount: bigint): Money {
    return new Money(amount);
  }

  static add(a: Money, b: Money): Money {
    return new Money(a.amount + b.amount);
  }

  static subtract(a: Money, b: Money): Money {
    return new Money(a.amount - b.amount);
  }

  isPositiveOrZero(): boolean {
    return this.#amount >= 0n;
  }

  isNegative(): boolean {
    return this.#amount < 0n;
  }

  isPositive(): boolean {
    return this.#amount > 0n;
  }

  isGreaterThanOrEqualTo(money: Money): boolean {
    return this.#amount >= money.amount;
  }

  isGreaterThan(money: Money): boolean {
    return this.#amount >= money.amount;
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
