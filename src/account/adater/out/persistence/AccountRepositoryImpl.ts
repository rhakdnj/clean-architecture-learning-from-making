import { AccountEntity } from './entity/AccountEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AccountRepository } from './AccountRepository';
import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from '@app/common';
import { AccountEntityRepository } from './entity/AccountEntityRepository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    private readonly accountEntityRepository: TypeOrmRepository<AccountEntity>,
  ) {}

  findById(id: number): Promise<AccountEntity> {
    return this.accountEntityRepository.findOneEntity({ id });
  }
}
