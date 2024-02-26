import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignInDTO } from "./dto/signIn.dto";
import { SignUpDTO } from "./dto/signUp.dto";
import { UserService } from "../user/user.service";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOkResponse({
    description: "The user exists and provided valid parameters",
  })
  @ApiNotFoundResponse({
    description: "The user does not exist",
  })
  @ApiUnauthorizedResponse({
    description: "Provided login and password combination is not valid",
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @ApiCreatedResponse({
    description: "Parameters provided are valid and user is created",
  })
  @ApiBadRequestResponse({
    description: "A user with the provided login already exists",
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDTO) {
    try {
      await this.userService.getByLogin(signUpDto.login);
    } catch (e) {
      return this.authService.signUp(
        signUpDto.login,
        signUpDto.password,
        signUpDto.fio,
      );
    }

    throw new BadRequestException("Login is already taken");
  }
}
