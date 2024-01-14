import { Controller, Get, Param } from '@nestjs/common';
import { GetAccountBalanceQuery } from '../../../application/port/in/query/GetAccountBalanceQuery';
import { GetAccountListQuery } from '../../../application/port/in/query/GetAccountListQuery';

@Controller('accounts')
export class GetAccountListController {
  constructor(private readonly getAccountListQuery: GetAccountListQuery) {}

  @Get()
  async getAccountList() {
    return;
  }
}
