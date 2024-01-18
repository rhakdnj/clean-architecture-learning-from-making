import { UserEntity } from '@/user/domain/entity/user.entity'
import { UserRepository } from '@/user/domain/repository/user.repository'
import { NotFoundError } from '@/shared/domain/error/not-found-error'
import { ConflictError } from '@/shared/domain/error/conflict-error'
import { InMemorySearchableRepository } from '@/shared/domain/repository/in-memory-searchable.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using email ${email}`)
    }
    return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Email address already used')
    }
  }
}
