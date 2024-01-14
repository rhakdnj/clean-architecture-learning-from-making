import { HttpException, HttpExceptionOptions } from '@nestjs/common';
import { Money } from '../../domain/Money';

export class ThresholdException extends HttpException {
  constructor(threshold: Money, actual: Money) {
    const message = `Maximum threshold for transferring money exceeded: tried to transfer %${actual.amount} but threshold is %${threshold.amount}`;
    super(message, 409);
  }
}
