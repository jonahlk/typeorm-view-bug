import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity({name: 'demo_entity_one'})
export class DemoEntityOne {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  property: string;

}