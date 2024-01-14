import { SendMoneyUseCase } from '../port/in/SendMoneyUseCase';
import { SendMoneyCommand } from '../port/in/command/SendMoneyCommand';
import { LoadAccountPort } from '../../adater/out/persistence/LoadAccountPort';
import { UpdateAccountStatePort } from '../../adater/out/persistence/UpdateAccountStatePort';
import { Inject, Injectable } from '@nestjs/common';
import { MoneyTransferProperties } from './MoneyTransferProperties';
import { AccountLock } from '../port/out/AccountLock';
import { ThresholdException } from './ThresholdException';
import { LocalDateTime } from '@js-joda/core';

@Injectable()
export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    @Inject('LOAD_ACCOUNT_PORT')
    private readonly loadAccountPort: LoadAccountPort,
    @Inject('UPDATE_ACCOUNT_STATE_PORT')
    private readonly updateAccountStatePort: UpdateAccountStatePort,
    private readonly moneyTransferProperties: MoneyTransferProperties,
    @Inject('ACCOUNT_LOCK')
    private readonly accountLock: AccountLock,
  ) {}
  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    this.checkThreshold(command);

    const baselineDate = LocalDateTime.now().minusDays(10);

    const sourceAccount = await this.loadAccountPort.loadAccount(
      command.sourceAccountId,
      baselineDate,
    );

    const targetAccount = await this.loadAccountPort.loadAccount(
      command.targetAccountId,
      baselineDate,
    );

    if (!sourceAccount.id)
      throw new Error('expected source account ID not to be empty');
    if (!targetAccount.id)
      throw new Error('expected target account ID not to be empty');

    this.accountLock.lockAccount(sourceAccount.id);
    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      this.accountLock.releaseAccount(sourceAccount.id);
      return false;
    }

    this.updateAccountStatePort.updateActivities(sourceAccount);
    this.updateAccountStatePort.updateActivities(targetAccount);

    this.accountLock.releaseAccount(sourceAccount.id);
    this.accountLock.releaseAccount(targetAccount.id);
    return true;
  }

  private checkThreshold(command: SendMoneyCommand) {
    if (
      command.money.isGreaterThan(
        this.moneyTransferProperties.maximumTransferThreshold,
      )
    ) {
      throw new ThresholdException(
        this.moneyTransferProperties.maximumTransferThreshold,
        command.money,
      );
    }
  }
}
