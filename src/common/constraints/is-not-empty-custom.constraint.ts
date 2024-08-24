import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNotEmptyCustomConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `${validationArguments.property} không được trống!`;
  }
}
