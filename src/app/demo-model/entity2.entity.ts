import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {DemoEntityOne}                                                 from './entity1.entity';


@Entity({name: 'demo_entity_two'})
export class DemoEntityTwo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  demoEntityOneId: number;

  @Column({name: 'some_other_property'})
  someOtherProperty: string;

  @ManyToOne(() => DemoEntityOne)
  @JoinColumn({name: 'demoEntityOneId'})
  demoEntityOne: DemoEntityOne;
}