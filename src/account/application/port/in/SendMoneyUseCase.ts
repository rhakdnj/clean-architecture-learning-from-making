import { SendMoneyCommand } from './command/SendMoneyCommand';

export const SEND_MONEY_USE_CASE = 'SEND_MONEY_USE_CASE';

export interface SendMoneyUseCase {
  sendMoney(command: SendMoneyCommand): Promise<boolean>;
}
