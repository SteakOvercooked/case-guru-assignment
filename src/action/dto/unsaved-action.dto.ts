import { IsNumber, IsPositive } from "class-validator";

import { CreateActionDTO } from "./create-action.dto";

export class UnsavedActionDTO extends CreateActionDTO {
  @IsPositive()
  @IsNumber()
  actionTime: number;
}
