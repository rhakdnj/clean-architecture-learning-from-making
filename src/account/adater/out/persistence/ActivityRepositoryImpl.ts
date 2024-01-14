import { MoreThanOrEqual } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { TypeOrmRepository } from '@app/common';
import { ActivityEntity } from './entity/ActivityEntity';
import { ActivityRepository } from './ActivityRepository';

export class ActivityRepositoryImpl implements ActivityRepository {
  constructor(
    private readonly accountEntityRepository: TypeOrmRepository<ActivityEntity>,
  ) {}

  async create(entity: ActivityEntity): Promise<ActivityEntity> {
    return this.accountEntityRepository.createEntity(entity);
  }

  async findByOwnerSince(
    ownerAccountId: number,
    since: LocalDateTime,
  ): Promise<ActivityEntity[]> {
    return this.accountEntityRepository.findEntities({
      ownerAccountId,
      timestamp: MoreThanOrEqual(since),
    });
  }

  async getDepositBalanceUntil(
    accountId: number,
    until: LocalDateTime,
  ): Promise<number> {
    return await this.accountEntityRepository.queryBuilder
      .select('sum(amount)')
      .where('targetAccountId = : accountId', { accountId })
      .andWhere('ownerAccountId = : accountId', { accountId })
      .where('timestamp < :until', { until })
      .getRawOne();
  }

  async getWithdrawalBalanceUntil(
    accountId: number,
    until: LocalDateTime,
  ): Promise<number> {
    return await this.accountEntityRepository.queryBuilder
      .select('sum(amount)')
      .where('sourceAccountId = : accountId', { accountId })
      .andWhere('ownerAccountId = : accountId', { accountId })
      .where('timestamp < :until', { until })
      .getRawOne();
  }
}
