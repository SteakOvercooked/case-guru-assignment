import * as path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { WeatherModule } from "./weather/weather.module";
import { ActionService } from "./action/action.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, "../.env"),
        path.resolve(__dirname, `../.app.${process.env.ENVIRONMENT}.env`),
      ],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow("JWT_SECRET"),
        signOptions: {
          expiresIn: "5m",
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isDev = configService.getOrThrow("ENVIRONMENT") === "dev";

        return {
          type: "mysql",
          host: configService.getOrThrow("MYSQL_HOST"),
          port: configService.getOrThrow("MYSQL_PORT"),
          username: configService.getOrThrow("MYSQL_USER"),
          password: configService.getOrThrow("MYSQL_PASSWORD"),
          database: configService.getOrThrow("MYSQL_DATABASE"),
          autoLoadEntities: true,
          synchronize: isDev,
          dropSchema: isDev,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService, ActionService],
})
export class AppModule {}
