import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { CourseEntity } from './course/course.entity';

@Entity('schedule_board')
export class ScheduleBoardEntity extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @OneToMany((type) => CourseEntity, (course) => course.scheduleBoard, {
    lazy: true,
    cascade: true,
  })
  courses: CourseEntity[];
}
