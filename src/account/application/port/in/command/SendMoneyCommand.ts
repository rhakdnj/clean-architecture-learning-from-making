import { AccountId } from '../../../../domain/Account';
import { Money } from '../../../../domain/Money';

export class SendMoneyCommand {
  private readonly _sourceAccountId: AccountId;
  private readonly _targetAccountId: AccountId;
  private readonly _money: Money;

  constructor(
    sourceAccountId: AccountId,
    targetAccountId: AccountId,
    money: Money,
  ) {
    this._sourceAccountId = sourceAccountId;
    this._targetAccountId = targetAccountId;
    this._money = money;

    this.requireNotNull(sourceAccountId);
    this.requireNotNull(targetAccountId);
    this.requireGreaterThan(money, Money.ZERO);
  }
  private requireNotNull(value: AccountId) {
    if (!value) throw new Error('AccountId is required');
  }

  private requireGreaterThan(target: Money, source: Money) {
    if (target.isGreaterThan(source))
      throw new Error('Money must be greater than 0');
  }

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get money(): Money {
    return this._money;
  }
}
