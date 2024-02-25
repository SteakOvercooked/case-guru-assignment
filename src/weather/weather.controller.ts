import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { GetCurrentDTO } from "./dto/get-current.dto";
import { WeatherService } from "./weather.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("weather")
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("/current")
  async getCurrent(@Body() getCurrentDTO: GetCurrentDTO) {
    return this.weatherService.getCurrent(
      getCurrentDTO.city,
      getCurrentDTO.language,
    );
  }
}
