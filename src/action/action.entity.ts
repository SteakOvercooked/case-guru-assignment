import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    nullable: true,
  })
  user?: User;

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
