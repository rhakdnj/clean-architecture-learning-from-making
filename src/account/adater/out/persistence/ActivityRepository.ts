import { LocalDateTime } from '@js-joda/core';
import { ActivityEntity } from './entity/ActivityEntity';

export abstract class ActivityRepository {
  abstract create(entity: ActivityEntity): Promise<ActivityEntity>;

  abstract findByOwnerSince(
    ownerAccountId: number,
    since: LocalDateTime,
  ): Promise<ActivityEntity[]>;

  abstract getDepositBalanceUntil(
    accountId: number,
    until: LocalDateTime,
  ): Promise<number>;

  abstract getWithdrawalBalanceUntil(
    accountId: number,
    until: LocalDateTime,
  ): Promise<number>;
}
