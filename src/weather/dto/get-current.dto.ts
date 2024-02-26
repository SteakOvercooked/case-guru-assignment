import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetCurrentDTO {
  @ApiProperty({
    description: "A city to return the weather in",
    required: true,
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: "A text localisation target language",
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;
}
