import { IsOptional, IsString } from "class-validator";

export class GetCurrentDTO {
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  language?: string;
}
