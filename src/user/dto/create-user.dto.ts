import { IsString, Length, MinLength } from "class-validator";

import { HasChar } from "../../validators/has-char.validator";

export class CreateUserDTO {
  @Length(6, 64)
  @IsString()
  login: string;

  @HasChar([".", ",", "!", "_"])
  @MinLength(6)
  @IsString()
  password: string;

  @Length(2, 64)
  @IsString()
  fio: string;
}
