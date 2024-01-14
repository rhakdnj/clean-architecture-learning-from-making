import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from '@js-joda/core';

export class LocalDateTimeTransformer {
  static readonly FORMAT = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');

  static fromStrDateTime(dateTime: string): LocalDateTime {
    try {
      if (!dateTime) return null;
      return LocalDateTime.parse(dateTime, this.FORMAT);
    } catch (error) {
      throw new Error(
        '잘못된 시간 형식입니다. yyyy-MM-dd HH:mm:ss 형태로 보내주세요.',
      );
    }
  }

  static fromDate(date: Date): LocalDateTime {
    if (!isConvertable(date)) return null;
    return LocalDateTime.from(nativeJs(date));
  }

  static toDate(localDateTime: LocalDateTime): Date {
    if (!localDateTime || !(localDateTime instanceof LocalDateTime)) {
      return null;
    }
    return convert(localDateTime).toDate();
  }
}

export class LocalDateTransformer {
  static fromDate(date: Date): LocalDate {
    if (!date || !(date instanceof Date)) return null;
    return LocalDate.from(nativeJs(date));
  }

  static toDate(localDate: LocalDate): Date {
    if (!localDate || !(localDate instanceof LocalDate)) return null;
    return convert(localDate).toDate();
  }
}

function isConvertable(date: any) {
  if (
    typeof date === 'object' &&
    date !== null &&
    typeof date.getTime === 'function' &&
    !isNaN(date) &&
    date instanceof Date
  ) {
    return true;
  }
  return false;
}
