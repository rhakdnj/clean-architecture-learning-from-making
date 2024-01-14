import { TypeOrmRepository } from '@app/common';
import { AccountEntity } from '../../src/account/adater/out/persistence/entity/AccountEntity';

export class FakeAccountRepository extends TypeOrmRepository<AccountEntity> {
  async findOneEntity() {
    return Promise.resolve(new AccountEntity(1));
  }
}
