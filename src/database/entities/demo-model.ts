import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity({name: 'users'})
export class DemoModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  firstName?: string;

  @Column({nullable: true})
  lastName?: string;
}