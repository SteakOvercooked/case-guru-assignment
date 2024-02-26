import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import { UserService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.body.apiToken;
    if (token === undefined) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token);
      const userId = this.jwtService.decode(token).sub;
      const user = await this.userService.getById(userId);
      request["user"] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
