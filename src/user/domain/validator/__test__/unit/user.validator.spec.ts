import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '@/user/domain/validator/user.validator'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'

describe('UserValidator unit tests', () => {
  let sut: UserValidator
  let props: UserRules

  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })

  it('Invalidation cases for name field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, name: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors['name']).toStrictEqual(['name should not be empty'])

    isValid = sut.validate({ ...props, name: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, name: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ])
  })

  it('Valid case for name field', () => {
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  it('Invalidation cases for email field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, email: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
    ])

    isValid = sut.validate({ ...props, email: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ])

    isValid = sut.validate({ ...props, email: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 255 characters',
    ])
  })

  it('Invalidation cases for password field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ])

    isValid = sut.validate({ ...props, password: '' })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
    ])

    isValid = sut.validate({ ...props, password: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ])

    isValid = sut.validate({ ...props, password: 'a'.repeat(256) })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ])
  })
})