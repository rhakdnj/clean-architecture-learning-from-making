import { Entity } from '@/shared/domain/entity/entity'
import { RepositoryInterface } from '@/shared/domain/repository/repository.interface'
import { SearchParams } from '@/shared/domain/repository/SearchParams'
import { SearchResult } from '@/shared/domain/repository/SearchResult'

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]

  search(props: SearchInput): Promise<SearchOutput>
}
