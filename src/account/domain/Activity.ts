import { AccountId } from './Account';
import { LocalDateTime } from '@js-joda/core';
import { Money } from './Money';

export class Activity {
  private readonly _id: ActivityId;

  /**
   * The account that owns this activity.
   */
  private readonly _ownerAccountId: AccountId;

  /**
   * The debited account.
   */
  private readonly _sourceAccountId: AccountId;

  /**
   * The credited account.
   */
  private readonly _targetAccountId: AccountId;

  /**
   * The timestamp of the activity.
   */
  private readonly _timestamp: LocalDateTime;

  /**
   * The money that was transferred between the accounts.
   */
  private readonly _money: Money;

  constructor(
    ownerAccountId: AccountId,
    sourceAccountId: AccountId,
    targetAccountId: AccountId,
    timestamp: LocalDateTime,
    money: Money,
    activityId?: ActivityId,
  ) {
    this._id = activityId ?? null;
    this._ownerAccountId = ownerAccountId;
    this._sourceAccountId = sourceAccountId;
    this._targetAccountId = targetAccountId;
    this._timestamp = timestamp;
    this._money = money;
  }

  get id(): ActivityId {
    return this._id;
  }

  get ownerAccountId(): AccountId {
    return this._ownerAccountId;
  }

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get timestamp(): LocalDateTime {
    return this._timestamp;
  }

  get money(): Money {
    return this._money;
  }
}

export class ActivityId {
  private readonly _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  equals(other: ActivityId): boolean {
    return this._id === other.id;
  }
}
