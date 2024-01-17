import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '@/user/domain/entity/user.entity'
import { ClassValidatorFields } from '@/shared/domain/validator/class-validator-fields'
import { LocalDateTime } from '@js-joda/core'
import { IsLocalDateTime } from '@/shared/common/vaildator/is-local-date-time.vaildator'

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsLocalDateTime()
  createdAt?: LocalDateTime

  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
