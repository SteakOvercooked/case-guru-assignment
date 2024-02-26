import { IsString } from "class-validator";

import { GuestUserDTO } from "./guest-user.dto";

export class UserDTO extends GuestUserDTO {
  @IsString()
  apiToken: string;
}
