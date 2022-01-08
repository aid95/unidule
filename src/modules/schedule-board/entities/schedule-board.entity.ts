import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';

@Entity('SCHEDULE_BOARD')
export class ScheduleBoardEntity extends BaseEntity {
  @Column({ name: 'TITLE' })
  title: string;
}
