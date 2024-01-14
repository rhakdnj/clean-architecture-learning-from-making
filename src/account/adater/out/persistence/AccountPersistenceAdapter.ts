import { LoadAccountPort } from './LoadAccountPort';
import { UpdateAccountStatePort } from './UpdateAccountStatePort';
import { ActivityRepository } from './ActivityRepository';
import { AccountRepository } from './AccountRepository';
import { AccountMapper } from './AccountMapper';
import { Account, AccountId } from '../../../domain/Account';
import { LocalDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly activityRepository: ActivityRepository,
    private readonly accountMapper: AccountMapper,
  ) {}

  async loadAccount(
    accountId: AccountId,
    baseLineDateTime: LocalDateTime,
  ): Promise<Account> {
    const account = await this.accountRepository.findById(accountId.id);
    if (!account) throw new Error('Entity Not Found');

    const activities = await this.activityRepository.findByOwnerSince(
      accountId.id,
      baseLineDateTime,
    );

    const withdrawalBalance = this.orZero(
      await this.activityRepository.getWithdrawalBalanceUntil(
        accountId.id,
        baseLineDateTime,
      ),
    );

    const depositBalance = this.orZero(
      await this.activityRepository.getDepositBalanceUntil(
        accountId.id,
        baseLineDateTime,
      ),
    );

    return this.accountMapper.mapToDomainEntity(
      account,
      activities,
      withdrawalBalance,
      depositBalance,
    );
  }

  private orZero(value: number): number {
    return value === null ? 0 : value;
  }

  updateActivities(account: Account) {
    for (const activity of account.activityWindow.activities) {
      if (account.id === null) {
        this.activityRepository.create(
          this.accountMapper.mapToActivityEntity(activity),
        );
      }
    }
  }
}
