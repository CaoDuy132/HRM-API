import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStringCustomConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'string';
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} phải là chuỗi!`;
  }
}
