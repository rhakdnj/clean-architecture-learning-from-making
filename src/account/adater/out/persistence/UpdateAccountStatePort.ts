import { Account } from '../../../domain/Account';

export interface UpdateAccountStatePort {
  updateActivities(sourceAccount: Account): void;
}
