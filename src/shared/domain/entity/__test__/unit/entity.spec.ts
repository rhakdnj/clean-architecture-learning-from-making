import { Entity } from '@/shared/domain/entity/entity'
import { validate as validateUuid } from 'uuid'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(validateUuid(entity.id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d'
    const entity = new StubEntity(props, id)

    expect(validateUuid(entity.id)).toBeTruthy()
    expect(entity.id).toBe(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})