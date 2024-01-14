import { ValueTransformer } from 'typeorm';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import {
  LocalDateTimeTransformer,
  LocalDateTransformer,
} from '@app/common/util/DateTimeTransformer';

export class LocalDateTimeValueTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return LocalDateTimeTransformer.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return LocalDateTimeTransformer.fromDate(databaseValue);
  }
}

export class LocalDateValueTransformer implements ValueTransformer {
  to(entityValue: LocalDate): Date {
    return LocalDateTransformer.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDate {
    return LocalDateTransformer.fromDate(databaseValue);
  }
}
