import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  IsNotEmptyCustomConstraint,
  IsNumberCustomConstraint,
  IsStringCustomConstraint,
} from '../constraints';

function createCustomDecorator(
  constraintClass: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): any {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: constraintClass,
    });
  };
}

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return createCustomDecorator(IsNotEmptyCustomConstraint, validationOptions);
}

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return createCustomDecorator(IsStringCustomConstraint, validationOptions);
}

export function IsNumberCustom(validationOptions?: ValidationOptions) {
  return createCustomDecorator(IsNumberCustomConstraint, validationOptions);
}
