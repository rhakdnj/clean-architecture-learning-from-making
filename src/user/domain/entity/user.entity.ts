import { LocalDateTime } from '@js-joda/core'
import { Entity } from '@/shared/domain/entity/entity'
import { UserValidatorFactory } from '@/user/domain/validator/user.validator'
import { EntityValidationError } from '@/shared/domain/error/validation-error'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: LocalDateTime
}

export class UserEntity extends Entity<UserProps> {
  constructor(public readonly props: UserProps, id?: string) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? LocalDateTime.now()
  }

  updateName(value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value
  }

  get name(): string {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  get password(): string {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get email(): string {
    return this.props.email
  }

  get createdAt(): LocalDateTime {
    return this.props.createdAt
  }

  private static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
