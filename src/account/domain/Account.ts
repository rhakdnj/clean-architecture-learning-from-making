import { Money } from './Money';
import { ActivityWindow } from './ActivityWindow';
import { Activity } from './Activity';
import { LocalDateTime } from '@js-joda/core';

export class Account {
  /**
   * The unique ID of the account.
   */
  private readonly _id: AccountId;

  /**
   * The baseline balance of the account. This was the balance of the account before the first
   * activity in the activityWindow.
   */
  private readonly _baselineBalance: Money;

  /**
   * The window of latest activities on this account.
   */
  private readonly _activityWindow: ActivityWindow;

  constructor(
    id: AccountId,
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ) {
    this._id = id;
    this._baselineBalance = baselineBalance;
    this._activityWindow = activityWindow;
  }

  /**
   * Creates an {@link Account} entity without an ID. Use to create a new entity that is not yet
   * persisted.
   */
  static withoutId(
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ): Account {
    return new Account(null, baselineBalance, activityWindow);
  }

  /**
   * Creates an {@link Account} entity with an ID. Use to reconstitute a persisted entity.
   */
  static withId(
    accountId: AccountId,
    baselineBalance: Money,
    activityWindow: ActivityWindow,
  ): Account {
    return new Account(accountId, baselineBalance, activityWindow);
  }

  /**
   * Calculates the total balance of the account by adding the activity values to the baseline balance.
   */
  get calculateBalance(): Money {
    return Money.add(
      this._baselineBalance,
      this._activityWindow.calculateBalance(this._id),
    );
  }

  /**
   * Tries to withdraw a certain amount of money from this account.
   * If successful, creates a new activity with a negative value.
   * @return true if the withdrawal was successful, false if not.
   */
  withdraw(money: Money, targetAccountId: AccountId): boolean {
    if (!this.mayWithdraw(money)) {
      return false;
    }

    const withdrawal = new Activity(
      this.id,
      this.id,
      targetAccountId,
      LocalDateTime.now(),
      money,
    );
    this.activityWindow.addActivity(withdrawal);
    return true;
  }

  private mayWithdraw(money: Money): boolean {
    return Money.add(this.calculateBalance, money.negate()).isPositiveOrZero();
  }

  /**
   * Tries to deposit a certain amount of money to this account.
   * If successful, creates a new activity with a positive value.
   * @return true if the deposit was successful, false if not.
   */
  deposit(money: Money, sourceAccountId: AccountId): boolean {
    const deposit = new Activity(
      this.id,
      sourceAccountId,
      this.id,
      LocalDateTime.now(),
      money,
    );
    this.activityWindow.addActivity(deposit);
    return true;
  }

  get id(): AccountId {
    return this._id;
  }

  get baselineBalance(): Money {
    return this._baselineBalance;
  }

  get activityWindow(): ActivityWindow {
    return this._activityWindow;
  }
}

export class AccountId {
  private readonly _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  equals(other: AccountId): boolean {
    return this._id === other.id;
  }
}
