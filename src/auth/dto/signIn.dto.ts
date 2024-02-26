import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDTO {
  @ApiProperty({
    description: "A login of the user",
    required: true,
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: "A password of the user",
    required: true,
  })
  @IsString()
  password: string;
}
