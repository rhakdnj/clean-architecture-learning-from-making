import { Entity } from '@/shared/domain/entity/entity'
import { RepositoryInterface } from '@/shared/domain/repository/repository.interface'

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}
