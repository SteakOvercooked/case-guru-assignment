import {
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from "class-validator";

import { UserEntity } from "../../user/user.entity";
import { Type } from "class-transformer";
import { UserDTO } from "../../user/dto/user.dto";

export class CreateActionDTO {
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserEntity;

  @IsPositive()
  @IsNumber()
  requestResult: number;

  @IsNumber()
  @IsOptional()
  tempC?: number;
}
