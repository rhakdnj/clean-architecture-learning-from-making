import { Account, AccountId } from '../../src/account/domain/Account';
import { Money } from '../../src/account/domain/Money';
import { ActivityWindow } from '../../src/account/domain/ActivityWindow';

export class AccountTestData {
  static defaultAccount(): AccountBuilder {
    return new AccountBuilder()
      .withAccountId(new AccountId(123))
      .withBaselineBalance(Money.of(999))
      .withActivityWindow(new ActivityWindow());
  }
}

export class AccountBuilder {
  private accountId: AccountId;
  private baselineBalance: Money;
  private activityWindow: ActivityWindow;

  public withAccountId(accountId: AccountId): AccountBuilder {
    this.accountId = accountId;
    return this;
  }

  public withBaselineBalance(baselineBalance: Money): AccountBuilder {
    this.baselineBalance = baselineBalance;
    return this;
  }

  public withActivityWindow(activityWindow: ActivityWindow): AccountBuilder {
    this.activityWindow = activityWindow;
    return this;
  }

  public build(): Account {
    return Account.withId(
      this.accountId,
      this.baselineBalance,
      this.activityWindow,
    );
  }
}
