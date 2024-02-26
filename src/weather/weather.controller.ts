import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ServiceUnavailableException,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiOkResponse } from "@nestjs/swagger";

import { GetCurrentDTO } from "./dto/get-current.dto";
import { WeatherService } from "./weather.service";
import { AuthGuard } from "../auth/auth.guard";
import { Action, createAction } from "../action/action.entity";

@Controller("weather")
export class WeatherController {
  constructor(
    private weatherService: WeatherService,
    @InjectRepository(Action) private actionRepository: Repository<Action>,
  ) {}

  @ApiOkResponse({
    description: `The provided params are valid and the weather is successfuly returned.
      For all the error codes see https://www.weatherapi.com/docs/#intro-error-codes`,
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("/current")
  async getCurrent(
    @Req() request: Request,
    @Body() getCurrentDTO: GetCurrentDTO,
  ) {
    const { body, code } = await this.weatherService.getCurrent(
      getCurrentDTO.city,
      getCurrentDTO.language,
    );
    const action = await createAction({
      requestResult: code,
      user: request.user!.toEntity(), // always present because of the auth guard
      tempC: code === HttpStatus.OK ? body.current.tempC : undefined,
    });
    await this.actionRepository.save(action);

    switch (code) {
      case HttpStatus.OK:
        return body;
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(body.error.message);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(body.error.message);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(body.error.message);
      default:
        throw new ServiceUnavailableException();
    }
  }
}
