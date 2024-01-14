import { Account, AccountId } from '../../src/account/domain/Account';
import { Money } from '../../src/account/domain/Money';
import { ActivityWindow } from '../../src/account/domain/ActivityWindow';
import { Activity, ActivityId } from '../../src/account/domain/Activity';
import { LocalDateTime } from '@js-joda/core';

export class ActivityTestData {
  static defaultActivity(): ActivityBuilder {
    return new ActivityBuilder()
      .withOwnerAccountId(new AccountId(123))
      .withSourceAccountId(new AccountId(123))
      .withTargetAccountId(new AccountId(124))
      .withTimestamp(LocalDateTime.now())
      .withMoney(Money.of(999));
  }
}

export class ActivityBuilder {
  private activityId: ActivityId;
  private ownerAccountId: AccountId;
  private sourceAccountId: AccountId;
  private targetAccountId: AccountId;
  private money: Money;
  private timestamp: LocalDateTime;

  withActivityId(activityId: ActivityId): ActivityBuilder {
    this.activityId = activityId;
    return this;
  }

  withOwnerAccountId(ownerAccountId: AccountId): ActivityBuilder {
    this.ownerAccountId = ownerAccountId;
    return this;
  }

  withSourceAccountId(sourceAccountId: AccountId): ActivityBuilder {
    this.sourceAccountId = sourceAccountId;
    return this;
  }

  withTargetAccountId(targetAccountId: AccountId): ActivityBuilder {
    this.targetAccountId = targetAccountId;
    return this;
  }

  withTimestamp(timestamp: LocalDateTime): ActivityBuilder {
    this.timestamp = timestamp;
    return this;
  }

  withMoney(money: Money): ActivityBuilder {
    this.money = money;
    return this;
  }

  public build(): Activity {
    return new Activity(
      this.ownerAccountId,
      this.sourceAccountId,
      this.targetAccountId,
      this.timestamp,
      this.money,
      this.activityId,
    );
  }
}
