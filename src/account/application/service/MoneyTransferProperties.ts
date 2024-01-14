import { Money } from '../../domain/Money';

export class MoneyTransferProperties {
  private readonly _maximumTransferThreshold = Money.of(1_000_000);

  constructor(maximumTransferThreshold: Money) {
    this._maximumTransferThreshold = maximumTransferThreshold;
  }

  get maximumTransferThreshold(): Money {
    return this._maximumTransferThreshold;
  }
}
