import { IsString } from "class-validator";

export class SignInDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
