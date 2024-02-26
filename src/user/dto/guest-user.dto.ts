import { IsString, IsUUID, Length } from "class-validator";

export class GuestUserDTO {
  @IsUUID()
  id: string;

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
