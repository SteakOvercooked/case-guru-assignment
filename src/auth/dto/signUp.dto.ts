import { IsString, Length, MinLength } from "class-validator";

import { HasChar } from "../../validators/has-char.validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDTO {
  @ApiProperty({
    description: "A login of the user",
    required: true,
    minLength: 6,
    maxLength: 64,
  })
  @Length(6, 64)
  @IsString()
  login: string;

  @ApiProperty({
    description:
      "A password of the user. Has to include one of the characters . , ! _",
    required: true,
    minLength: 6,
  })
  @HasChar([".", ",", "!", "_"])
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({
    description: "A fio of the user",
    required: true,
    minLength: 2,
    maxLength: 64,
  })
  @Length(2, 64)
  @IsString()
  fio: string;
}
