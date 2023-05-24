import { RoleType } from '@app/constants/role-file';
import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function UserRoleMatch(property: string[], validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const property = JSON.stringify(relatedPropertyName);

          return property.includes(value);
        },
        defaultMessage: () => {
          return `User role must be ${RoleType.USER} or ${RoleType.PROVIDER}`;
        }
      }
    });
  };
}
