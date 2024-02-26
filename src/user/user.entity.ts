import { Entity, Column, PrimaryColumn } from "typeorm";
import * as crypto from "crypto";

import { CreateUserDTO } from "./dto/create-user.dto";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { formValidationMessage } from "../utils";

@Entity()
export class UserEntity {
  @PrimaryColumn({
    type: "char",
    length: 36,
  })
  id: string;

  @Column({
    type: "varchar",
    length: 64,
    unique: true,
  })
  login: string;

  @Column({
    type: "char",
    length: 60,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 64,
  })
  fio: string;

  @Column({
    type: "varchar",
    name: "api_token",
  })
  apiToken: string;
}

export class User {
  private _id: string;

  private _login: string;
  private _password: string;
  private _fio: string;

  apiToken?: string;

  static fromEntity(entity: UserEntity) {
    const user = new User({
      fio: entity.fio,
      login: entity.login,
      password: entity.password,
    });
    user._id = entity.id;
    user.apiToken = entity.apiToken;

    return user;
  }

  constructor(user: CreateUserDTO) {
    const dtoInstance = plainToInstance(CreateUserDTO, user);
    const errors = validateSync(dtoInstance);

    if (errors.length > 0) {
      throw new Error(
        `Failed to create a user: [${formValidationMessage(errors)}]`,
      );
    }

    this._id = crypto.randomUUID();
    this._login = user.login;
    this._password = user.password;
    this._fio = user.fio;
  }

  id() {
    return this._id;
  }

  fio() {
    return this._fio;
  }

  password() {
    return this._password;
  }

  toEntity() {
    if (this.apiToken === undefined) {
      throw new Error("Can not convert a user without apiToken to entity");
    }

    const entity = new UserEntity();
    entity.id = this._id;
    entity.login = this._login;
    entity.password = this._password;
    entity.fio = this._fio;
    entity.apiToken = this.apiToken;

    return entity;
  }
}
