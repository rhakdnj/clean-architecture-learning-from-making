import { LocalDateTime } from '@js-joda/core'
import { Entity } from '@/shared/domain/entity/entity'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: LocalDateTime
}

export class UserEntity extends Entity<UserProps> {
  constructor(public readonly props: UserProps, id?: string) {
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? LocalDateTime.now()
  }

  updateName(value: string): void {
    this.name = value
  }

  get name(): string {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  updatePassword(value: string): void {
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
}
