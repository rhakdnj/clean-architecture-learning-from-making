import { AccountEntity } from './entity/AccountEntity';
import { ActivityEntity } from './entity/ActivityEntity';
import { Money } from '../../../domain/Money';
import { Account, AccountId } from '../../../domain/Account';
import { Activity, ActivityId } from '../../../domain/Activity';
import { ActivityWindow } from '../../../domain/ActivityWindow';

export class AccountMapper {
  mapToDomainEntity(
    account: AccountEntity,
    activities: ActivityEntity[],
    withdrawalBalance: number,
    depositBalance: number,
  ) {
    const baselineBalance = Money.subtract(
      Money.of(depositBalance),
      Money.of(withdrawalBalance),
    );

    return Account.withId(
      new AccountId(account.id),
      baselineBalance,
      this.mapToActivityWindow(activities),
    );
  }

  mapToActivityWindow(activities: ActivityEntity[]) {
    const result: Activity[] = [];
    activities.forEach((activity) => {
      result.push(
        new Activity(
          new AccountId(activity.ownerAccountId),
          new AccountId(activity.sourceAccountId),
          new AccountId(activity.targetAccountId),
          activity.timestamp,
          Money.of(activity.amount),
          new ActivityId(activity.id),
        ),
      );
    });
    return new ActivityWindow(result);
  }

  mapToActivityEntity(activity: Activity): ActivityEntity {
    return new ActivityEntity(
      activity.id === null ? null : activity.id.id,
      activity.ownerAccountId.id,
      activity.sourceAccountId.id,
      activity.targetAccountId.id,
      Number(activity.money.amount),
      activity.timestamp,
    );
  }
}
