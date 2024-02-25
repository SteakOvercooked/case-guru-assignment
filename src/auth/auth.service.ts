import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    return this.jwtService.signAsync({ sub: user.id });
  }

  async signIn(login: string, password: string) {
    const user = await this.userService.getByLogin(login);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const isOk = await bcrypt.compare(password, hashedPassword);
    if (!isOk) {
      throw new UnauthorizedException("The password is invalid");
    }

    const token = await this.generateToken(user);
    await this.userService.save(user);

    return { fio: user.fio, token };
  }

  async signUp(login: string, password: string, fio: string) {
    const user = await this.userService.create({ login, password, fio });
    const token = await this.generateToken(user);

    user.apiToken = token;
    await this.userService.save(user);

    return { fio: user.fio, token };
  }
}
