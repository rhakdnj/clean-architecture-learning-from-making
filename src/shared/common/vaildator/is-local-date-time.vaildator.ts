import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { LocalDateTime } from '@js-joda/core'
import { Transform, TransformFnParams } from 'class-transformer'

export function IsLocalDateTime(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform((transformFnParams: TransformFnParams) => {
      try {
        return LocalDateTime.parse(transformFnParams.value)
      } catch {
        return transformFnParams.value
      }
    })(object, propertyName)

    registerDecorator({
      constraints: [],
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        validate: (value: LocalDateTime) => value instanceof LocalDateTime,
        defaultMessage: () => `${propertyName} must be ISO 8601 format string`,
      },
    })
  }
}
