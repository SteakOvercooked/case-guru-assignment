import { ValidationError } from "class-validator";

export function formValidationMessage(errors: ValidationError[]) {
  return errors
    .filter((e) => e.constraints !== undefined)
    .flatMap((e) => Object.values(e.constraints!))
    .map((e) => `"${e}"`)
    .join(", ");
}
