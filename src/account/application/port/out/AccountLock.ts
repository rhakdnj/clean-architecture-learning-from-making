import { AccountId } from '../../../domain/Account';

export interface AccountLock {
  lockAccount(accountId: AccountId): void;

  releaseAccount(accountId: AccountId): void;
}
