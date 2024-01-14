import { TypeOrmRepository } from '@app/common';
import { AccountEntity } from './AccountEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class AccountEntityRepository extends TypeOrmRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountEntityRepository: Repository<AccountEntity>,
    entityManager: EntityManager,
  ) {
    super(accountEntityRepository, entityManager);
  }
}
