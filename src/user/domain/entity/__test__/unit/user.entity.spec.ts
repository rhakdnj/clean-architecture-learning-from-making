import { UserEntity, UserProps } from '@/user/domain/entity/user.entity'
import { LocalDateTime } from '@js-joda/core'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'

describe('User entity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(LocalDateTime)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Setter of name field', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Setter of password field', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(LocalDateTime)
  })

  it('Should update a user', () => {
    sut.updateName('other name')
    expect(sut.props.name).toEqual('other name')
  })

  it('Should update the password field', () => {
    sut.updatePassword('other password')
    expect(sut.props.password).toEqual('other password')
  })
})
