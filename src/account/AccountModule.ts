import { Module } from '@nestjs/common';
import { GetAccountBalanceController } from './adater/in/web/GetAccountBalanceController';
import { GetAccountController } from './adater/in/web/GetAccountController';
import { GetAccountListController } from './adater/in/web/GetAccountListController';
import { RegisterAccountController } from './adater/in/web/RegisterAccountController';
import { SendMoneyController } from './adater/in/web/SendMoneyController';
import { AccountEntityRepositoryModule } from './adater/out/persistence/entity/AccountEntityRepositoryModule';

@Module({
  imports: [AccountEntityRepositoryModule],
  providers: [],
  controllers: [
    GetAccountBalanceController,
    GetAccountController,
    GetAccountListController,
    RegisterAccountController,
    SendMoneyController,
  ],
})
export class AccountModule {}
