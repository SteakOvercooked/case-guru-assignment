import { IsNumber, IsPositive } from "class-validator";

import { UnsavedActionDTO } from "./unsaved-action.dto";

export class ActionDTO extends UnsavedActionDTO {
  @IsPositive()
  @IsNumber()
  id: number;
}
