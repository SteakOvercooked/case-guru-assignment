import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
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
    nullable: true,
  })
  apiToken?: string;
}
