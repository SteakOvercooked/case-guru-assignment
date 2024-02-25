import * as path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, "../.env"),
        path.resolve(__dirname, `../.app.${process.env.ENVIRONMENT}.env`),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isDev = configService.getOrThrow("ENVIRONMENT") === "dev";

        return {
          type: "mysql",
          host: configService.getOrThrow("MYSQL_HOST"),
          port: configService.getOrThrow("MYSQL_PORT"),
          username: configService.getOrThrow("MYSQL_USER"),
          password: configService.getOrThrow("MYSQL_PASSWORD"),
          database: configService.getOrThrow("MYSQL_DATABASE"),
          entities: [],
          synchronize: isDev,
          dropSchema: isDev,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
