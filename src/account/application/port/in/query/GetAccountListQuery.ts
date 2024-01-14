import { Money } from '../../../../domain/Money';
import { AccountId } from '../../../../domain/Account';

export interface GetAccountListQuery {
  getAccountBalance(accountId: AccountId): Promise<Money>;
}
