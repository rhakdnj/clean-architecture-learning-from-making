import { InMemoryRepository } from '@/shared/domain/repository/in-momory.repository'
import { Entity } from '@/shared/domain/entity/entity'
import { SearchableRepositoryInterface } from '@/shared/domain/repository/searchable-repository.interface'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
