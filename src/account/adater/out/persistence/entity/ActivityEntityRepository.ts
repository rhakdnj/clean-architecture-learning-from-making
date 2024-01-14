import { TypeOrmRepository } from '@app/common';
import { AccountEntity } from './AccountEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ActivityEntity } from './ActivityEntity';

export class ActivityEntityRepository extends TypeOrmRepository<ActivityEntity> {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityEntityRepository: Repository<ActivityEntity>,
    entityManager: EntityManager,
  ) {
    super(activityEntityRepository, entityManager);
  }
}
