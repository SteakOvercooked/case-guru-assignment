import { IsString, Length } from "class-validator";

export class CreateUserDTO {
  @Length(6, 64)
  @IsString()
  login: string;

  @Length(60, 60)
  @IsString()
  password: string;

  @Length(2, 64)
  @IsString()
  fio: string;
}
