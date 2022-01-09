import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';

@Entity('schedule_board')
export class ScheduleBoardEntity extends BaseEntity {
  @Column({ name: 'title' })
  title: string;
}
