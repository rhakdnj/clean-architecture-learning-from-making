import { AccountEntity } from './entity/AccountEntity';

export abstract class AccountRepository {
  abstract findById(id: number): Promise<AccountEntity>;
}
