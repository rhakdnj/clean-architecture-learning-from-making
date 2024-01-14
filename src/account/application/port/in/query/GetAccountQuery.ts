import { Money } from '../../../../domain/Money';
import { AccountId } from '../../../../domain/Account';

export interface GetAccountQuery {
  getAccountBalance(accountId: AccountId): Promise<Money>;
}
