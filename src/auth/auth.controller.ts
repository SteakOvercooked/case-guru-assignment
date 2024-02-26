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

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

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
