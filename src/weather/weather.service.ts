import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  static readonly API_HOST = "http://api.weatherapi.com/v1";

  async getCurrent(city: string, lang = "ru") {
    const key = this.configService.get<string>("WEATHER_API_KEY");
    if (key === undefined) {
      throw new InternalServerErrorException("Service config is malformed");
    }

    const res = await fetch(
      WeatherService.API_HOST +
        `/current.json?key=${key}&q=${city}&lang=${lang}`,
    );
    const body = await res.json();

    return { body, code: res.status };
  }
}
