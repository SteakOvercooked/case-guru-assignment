import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User, UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });
    if (user === null) {
      throw new NotFoundException("User does not exist");
    }

    return User.fromEntity(user);
  }

  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException("User does not exist");
    }

    return User.fromEntity(user);
  }

  async save(user: User) {
    await this.userRepository.save(user.toEntity());
  }
}
