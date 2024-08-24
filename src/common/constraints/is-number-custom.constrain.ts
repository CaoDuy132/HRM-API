import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNumberCustomConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'number';
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} phải là số!`;
  }
}
