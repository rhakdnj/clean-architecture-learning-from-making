import { Money } from '../../../../domain/Money';
import { AccountId } from '../../../../domain/Account';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<Money>;
}
