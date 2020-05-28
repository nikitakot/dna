import { BaseEntity } from '../shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @Column()
  text: string;
}
