import { faker } from '@faker-js/faker'
import { UserProps } from '@/user/domain/entity/user.entity'
import { LocalDateTime } from '@js-joda/core'

type Props = {
  name?: string
  email?: string
  password?: string
  createdAt?: LocalDateTime
}

export function UserDataBuilder(props: Props): UserProps {
  return {
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? LocalDateTime.now(),
  }
}
