import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import * as crypto from "crypto";

import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });
    if (user === null) {
      throw new NotFoundException("User does not exist");
    }

    return user;
  }

  async save(user: User) {
    await this.userRepository.save(user);
  }

  async create(createUserDTO: CreateUserDTO) {
    const userDto = plainToInstance(CreateUserDTO, createUserDTO);
    const err = await validate(userDto);

    if (err.length > 0) {
      throw new BadRequestException(
        err
          .filter((e) => e.constraints !== undefined)
          .flatMap((e) => Object.values(e.constraints!)),
      );
    }

    return this.userRepository.create({
      ...userDto,
      id: crypto.randomUUID(),
    });
  }
}
