import { LoadAccountPort } from '../../../src/account/adater/out/persistence/LoadAccountPort';
import {
  anyOfClass,
  anything,
  mock,
  strictEqual,
  verify,
  when,
} from 'ts-mockito';
import { AccountLock } from '../../../src/account/application/port/out/AccountLock';
import { UpdateAccountStatePort } from '../../../src/account/adater/out/persistence/UpdateAccountStatePort';
import { SendMoneyService } from '../../../src/account/application/service/SendMoneyService';
import { MoneyTransferProperties } from '../../../src/account/application/service/MoneyTransferProperties';
import { Money } from '../../../src/account/domain/Money';
import { Account, AccountId } from '../../../src/account/domain/Account';
import { SendMoneyCommand } from '../../../src/account/application/port/in/command/SendMoneyCommand';

describe('SendMoneyService', () => {
  const loadAccountPort = mock<LoadAccountPort>();
  const accountLock = mock<AccountLock>();
  const updateAccountStatePort = mock<UpdateAccountStatePort>();

  const sendMoneyService = new SendMoneyService(
    loadAccountPort,
    updateAccountStatePort,
    moneyTransferProperties(),
    accountLock,
  );

  it('succeeds transaction', async () => {
    // given
    const sourceAccount = givenSourceAccount();
    const targetAccount = givenTargetAccount();

    givenWithdrawalWillSucceed(sourceAccount);
    givenDepositWillSucceed(targetAccount);

    const money = Money.of(500);

    const command = new SendMoneyCommand(
      sourceAccount.id,
      targetAccount.id,
      money,
    );

    // when
    const success = await sendMoneyService.sendMoney(command);

    // then
    expect(success).toBeTruthy();

    verify(accountLock.lockAccount(sourceAccount.id)).called();
    verify(sourceAccount.withdraw(money, targetAccount.id)).called();
    verify(accountLock.releaseAccount(sourceAccount.id)).called();

    verify(accountLock.lockAccount(targetAccount.id)).called();
    verify(targetAccount.deposit(money, sourceAccount.id)).called();
    verify(accountLock.releaseAccount(targetAccount.id)).called();

    thenAccountsHaveBeenUpdated(sourceAccount.id, targetAccount.id);
  });

  function moneyTransferProperties(): MoneyTransferProperties {
    return new MoneyTransferProperties(Money.of(Number.MAX_VALUE));
  }

  function thenAccountsHaveBeenUpdated(...accountIds: AccountId[]): void {
    verify(updateAccountStatePort.updateActivities(anyOfClass(Account))).times(
      accountIds.length,
    );
  }

  function givenDepositWillSucceed(account: Account): void {
    when(account.deposit(anyOfClass(Money), anyOfClass(AccountId))).thenReturn(
      true,
    );
  }

  function givenWithdrawalWillFail(account: Account) {
    when(account.withdraw(anyOfClass(Money), anyOfClass(AccountId))).thenReturn(
      false,
    );
  }

  function givenWithdrawalWillSucceed(account: Account) {
    when(account.withdraw(anyOfClass(Money), anyOfClass(AccountId))).thenReturn(
      true,
    );
  }
  function givenSourceAccount(): Account {
    return givenAnAccountWithId(1);
  }

  function givenTargetAccount(): Account {
    return givenAnAccountWithId(2);
  }

  function givenAnAccountWithId(accountId: number) {
    const account = mock<Account>();

    when(account.id).thenReturn(new AccountId(accountId));

    when(
      loadAccountPort.loadAccount(
        strictEqual(new AccountId(accountId)),
        anything(),
      ),
    ).thenReturn(Promise.resolve(account));

    return account;
  }
});
