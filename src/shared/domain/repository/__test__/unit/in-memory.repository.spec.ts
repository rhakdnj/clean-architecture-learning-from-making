import { InMemoryRepository } from '@/shared/domain/repository/in-momory.repository'
import { Entity } from '@/shared/domain/entity/entity'
import { NotFoundError } from '@/shared/domain/error/not-found-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })
})
