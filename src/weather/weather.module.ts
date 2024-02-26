import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WeatherService } from "./weather.service";
import { WeatherController } from "./weather.controller";
import { UserModule } from "../user/user.module";
import { Action } from "../action/action.entity";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Action])],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
