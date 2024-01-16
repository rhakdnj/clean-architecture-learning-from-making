import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from '@/shared/domain/validator/validator-fields.interface'
import { validateSync } from 'class-validator'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null
  validateData: PropsValidated = null

  public validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length > 0) {
      errors.forEach(error => {
        const { property, constraints } = error
        this.errors[property] = Object.values(constraints)
      })
      return false
    }
    this.validateData = data
    return true
  }
}
