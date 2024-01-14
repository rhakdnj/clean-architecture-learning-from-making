import { SendMoneyCommand } from './command/SendMoneyCommand';

export interface RegisterAccountUseCase {
  sendMoney(command: SendMoneyCommand): Promise<boolean>;
}
