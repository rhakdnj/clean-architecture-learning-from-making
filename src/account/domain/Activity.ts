import { AccountId } from './Account';
import { LocalDateTime } from '@js-joda/core';
import { Money } from './Money';
import { timestamp } from 'rxjs';

export class Activity {
  #id: ActivityId;

  /**
   * The account that owns this activity.
   */
  readonly #ownerAccountId: AccountId;

  /**
   * The debited account.
   */
  readonly #sourceAccountId: AccountId;

  /**
   * The credited account.
   */
  readonly #targetAccountId: AccountId;

  /**
   * The timestamp of the activity.
   */
  readonly #timestamp: LocalDateTime;

  /**
   * The money that was transferred between the accounts.
   */
  readonly #money: Money;

  constructor(
    ownerAccountId: AccountId,
    sourceAccountId: AccountId,
    targetAccountId: AccountId,
    timestamp: LocalDateTime,
    money: Money,
  ) {
    this.#id = null;
    this.#ownerAccountId = ownerAccountId;
    this.#sourceAccountId = sourceAccountId;
    this.#targetAccountId = targetAccountId;
    this.#timestamp = timestamp;
    this.#money = money;
  }

  get id(): ActivityId {
    return this.#id;
  }

  get ownerAccountId(): AccountId {
    return this.#ownerAccountId;
  }

  get sourceAccountId(): AccountId {
    return this.#sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this.#targetAccountId;
  }

  get timestamp(): LocalDateTime {
    return this.#timestamp;
  }

  get money(): Money {
    return this.#money;
  }
}

export class ActivityId {
  #id: number;

  get id(): number {
    return this.#id;
  }
}
