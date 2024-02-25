import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${process.env.MYSQL_USER} user, ${process.env.MYSQL_HOST} host`;
  }
}
