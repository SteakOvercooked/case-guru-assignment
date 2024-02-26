import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { UserEntity } from "../user/user.entity";
import { CreateActionDTO } from "./dto/create-action.dto";
import { formValidationMessage } from "../utils";
import { UnsavedActionDTO } from "./dto/unsaved-action.dto";

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    nullable: true,
  })
  user?: UserEntity;

  @Column({
    type: "bigint",
    name: "action_time",
  })
  actionTime: number;

  @Column({
    type: "smallint",
    name: "request_result",
  })
  requestResult: number;

  @Column({
    type: "float",
    name: "temp_c",
    nullable: true,
  })
  tempC?: number;
}

export async function createAction(createActionDTO: CreateActionDTO) {
  const actionDto = plainToInstance(CreateActionDTO, createActionDTO);
  const errors = await validate(actionDto);

  if (errors.length > 0) {
    throw new Error(
      `Failed to create an action: [${formValidationMessage(errors)}]`,
    );
  }

  return plainToInstance(UnsavedActionDTO, {
    ...actionDto,
    actionTime: Math.floor(Date.now() / 1000),
  });
}
