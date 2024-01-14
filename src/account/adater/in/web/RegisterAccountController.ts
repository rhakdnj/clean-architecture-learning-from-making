import { RegisterAccountUseCase } from '../../../application/port/in/RegisterAccountUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import { AccountResource } from '../../../application/port/in/AccountResource';

@Controller('accounts')
export class RegisterAccountController {
  constructor(private readonly createAccountUseCase: RegisterAccountUseCase) {}

  @Post()
  async createAccount(@Body() account: AccountResource) {
    return;
  }
}
