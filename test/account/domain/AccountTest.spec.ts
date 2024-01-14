import { AccountId } from '../../../src/account/domain/Account';
import { AccountTestData } from '../../mock/AccountTestData';
import { Money } from '../../../src/account/domain/Money';
import { ActivityTestData } from '../../mock/ActivityTestData';
import { ActivityWindow } from '../../../src/account/domain/ActivityWindow';

describe('Account', () => {
  it('calculates balance', () => {
    // Given
    const accountId = new AccountId(1);
    const account = AccountTestData.defaultAccount()
      .withAccountId(accountId)
      .withBaselineBalance(Money.of(555))
      .withActivityWindow(
        new ActivityWindow([
          ActivityTestData.defaultActivity()
            .withTargetAccountId(accountId)
            .withMoney(Money.of(999))
            .build(),
          ActivityTestData.defaultActivity()
            .withTargetAccountId(accountId)
            .withMoney(Money.of(1))
            .build(),
        ]),
      )
      .build();

    // When
    const balance = account.calculateBalance;

    // Then
    expect(balance).toEqual(Money.of(1555));
  });

  it('should not withdraw more than balance', () => {
    const accountId = new AccountId(1);
    const account = AccountTestData.defaultAccount()
      .withAccountId(accountId)
      .withBaselineBalance(Money.of(555))
      .withActivityWindow(
        new ActivityWindow([
          ActivityTestData.defaultActivity()
            .withTargetAccountId(accountId)
            .withMoney(Money.of(999))
            .build(),
          ,
          ActivityTestData.defaultActivity()
            .withTargetAccountId(accountId)
            .withMoney(Money.of(1))
            .build(),
        ]),
      )
      .build();

    const success = account.withdraw(Money.of(1556), new AccountId(99));

    expect(success).toBeFalsy();
    expect(account.activityWindow.activities.length).toEqual(2);
    expect(account.calculateBalance).toEqual(Money.of(1555));
  });
});
