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

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): LocalDateTime {
    return this.props.createdAt
  }
}
