import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.body.apiToken;
    if (token === undefined) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
