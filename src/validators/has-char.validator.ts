import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "HasChar", async: true })
class HasCharValidator implements ValidatorConstraintInterface {
  validate(input: unknown, args: ValidationArguments) {
    if (typeof input !== "string") {
      return false;
    }

    const chars = args.constraints[0] as string[];
    return chars.length === 0 || chars.some((c) => input.includes(c));
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    if (typeof validationArguments?.value !== "string") {
      return `The value must be a string, got ${typeof validationArguments?.value}`;
    }

    return `One of the characters [${validationArguments.constraints[0].join(" ")}] has to be present`;
  }
}

export function HasChar(
  chars: string[],
  validationOptions?: ValidationOptions,
) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      target: obj.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [chars],
      validator: HasCharValidator,
    });
  };
}
