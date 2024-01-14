import { Controller, Get, Param } from '@nestjs/common';
import { GetAccountBalanceQuery } from '../../../application/port/in/query/GetAccountBalanceQuery';

@Controller('accounts')
export class GetAccountBalanceController {
  constructor(
    private readonly getAccountBalanceQuery: GetAccountBalanceQuery,
  ) {}

  @Get(':accountId/balance')
  async getAccountBalance(@Param('accountId') accountId: number) {
    return;
  }
}
