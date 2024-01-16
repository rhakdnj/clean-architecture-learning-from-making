import { LocalDateTime } from '@js-joda/core'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: LocalDateTime
}

export class UserEntity {
  constructor(public readonly props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? LocalDateTime.now()
  }
}
