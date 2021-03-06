import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseColumn } from '../../../../common/base/base-column.entity';
import { ScheduleBoardEntity } from '../schedule-boarad/schedule-board.entity';
import { DurationEntity } from '../common/duration.entity';

export type CourseEssentialProperties = Required<{
  readonly courseId: string;
  readonly title: string;
  readonly weekday: string; // TODO: enum으로 교체
  readonly duration: DurationEntity;
}>;

export type CourseUpdateProperties = Partial<CourseEssentialProperties>;

export type CourseProperties = CourseEssentialProperties;

@Entity('courses')
export class CourseEntity extends BaseColumn {
  @Column({
    name: 'course_id',
  })
  @Index({ unique: true })
  courseId: string;

  @Column((type) => DurationEntity, { prefix: false })
  duration: DurationEntity;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'weekday' })
  weekday: string;

  @ManyToOne(
    (type) => ScheduleBoardEntity,
    (scheduleBoard) => scheduleBoard.courses,
    { onDelete: 'CASCADE', createForeignKeyConstraints: false },
  )
  scheduleBoard: ScheduleBoardEntity;

  private constructor() {
    super();
  }

  static create(props: CourseEssentialProperties) {
    const entity = new CourseEntity();
    entity.courseId = props.courseId;
    entity.duration = props.duration;
    entity.weekday = props.weekday;
    entity.title = props.title;
    return entity;
  }
}
