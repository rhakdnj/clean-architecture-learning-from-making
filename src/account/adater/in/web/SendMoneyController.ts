import { Param, Post } from '@nestjs/common';
import { SendMoneyUseCase } from '../../../application/port/in/SendMoneyUseCase';
import { SendMoneyCommand } from '../../../application/port/in/command/SendMoneyCommand';
import { AccountId } from '../../../domain/Account';
import { Money } from '../../../domain/Money';

export class SendMoneyController {
  constructor(private readonly sendMoneyUseCase: SendMoneyUseCase) {}

  @Post('/accounts/send/:sourceAccountId/:targetAccountId/:amount')
  async sendMoney(
    @Param('sourceAccountId') sourceAccountId: number,
    @Param('targetAccountId') targetAccountId: number,
    @Param('amount') amount: number,
  ): Promise<boolean> {
    const command = new SendMoneyCommand(
      new AccountId(sourceAccountId),
      new AccountId(targetAccountId),
      Money.of(amount),
    );

    return this.sendMoneyUseCase.sendMoney(command);
  }
}
