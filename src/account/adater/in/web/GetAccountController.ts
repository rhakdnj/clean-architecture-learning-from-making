import { Controller, Get } from '@nestjs/common';
import { GetAccountQuery } from '../../../application/port/in/query/GetAccountQuery';

@Controller('accounts')
export class GetAccountController {
  constructor(private readonly getAccountQuery: GetAccountQuery) {}

  @Get(':accountId')
  async getAccount() {
    return;
  }
}
