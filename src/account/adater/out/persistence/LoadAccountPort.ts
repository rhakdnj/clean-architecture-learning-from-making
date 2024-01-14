import { Account, AccountId } from '../../../domain/Account';
import { LocalDateTime } from '@js-joda/core';

export interface LoadAccountPort {
  loadAccount(
    accountId: AccountId,
    baseLineDateTime: LocalDateTime,
  ): Promise<Account>;
}
