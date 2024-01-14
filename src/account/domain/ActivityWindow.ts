import { Activity } from './Activity';
import { LocalDateTime } from '@js-joda/core';
import { Money } from './Money';
import { AccountId } from './Account';

export class ActivityWindow {
  private readonly _activities: Activity[];

  constructor(activities?: Activity[]) {
    this._activities = activities ?? [];
  }

  get activities(): ReadonlyArray<Activity> {
    return this._activities;
  }

  addActivity(activity: Activity): void {
    this._activities.push(activity);
  }

  get startTimestamp(): LocalDateTime {
    const result = this._activities.reduce(
      (startTimestamp, val) =>
        startTimestamp.isBefore(val.timestamp) ? val.timestamp : startTimestamp,
      LocalDateTime.MAX,
    );
    if (LocalDateTime.MAX.equals(result))
      throw new Error('ActivityWindow has no activities');
    return result;
  }

  /**
   * The timestamp of the last activity within this window.
   */
  get endTimestamp(): LocalDateTime {
    const result = this._activities.reduce(
      (endTimeStamp, val) =>
        endTimeStamp.isAfter(val.timestamp) ? endTimeStamp : val.timestamp,
      LocalDateTime.MIN,
    );
    if (LocalDateTime.MIN.equals(result))
      throw new Error('ActivityWindow has no activities');
    return result;
  }

  calculateBalance(accountId: AccountId): Money {
    return this._activities
      .filter((activity) => activity.targetAccountId.equals(accountId))
      .reduce((a, b) => a.plus(b.money), Money.ZERO);
  }
}
