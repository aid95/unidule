import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseColumn } from '../../../../common/base/base-column.entity';
import { ScheduleBoardEntity } from '../schedule-boarad/schedule-board.entity';
import { DurationEntity } from '../common/duration.entity';
import { Title, titleTransformer } from '../vo/title.vo';
import { CourseId, courseIdTransformer } from '../vo/course-id.vo';
import { Weekday, weekDayTransformer } from '../vo/weekday.vo';

export type CourseEssentialProperties = Required<{
  readonly courseId: CourseId;
  readonly title: Title;
  readonly weekday: Weekday; // TODO: enum으로 교체
  readonly duration: DurationEntity;
}>;

export type CourseUpdateProperties = Partial<CourseEssentialProperties>;

export type CourseProperties = CourseEssentialProperties;

@Entity('courses')
export class CourseEntity extends BaseColumn {
  @Column({
    name: 'course_id',
    type: 'varchar',
    unique: true,
    transformer: courseIdTransformer,
  })
  courseId: CourseId;

  @Column((type) => DurationEntity, { prefix: false })
  duration: DurationEntity;

  @Column({ name: 'title', type: 'varchar', transformer: titleTransformer })
  title: Title;

  @Column({ name: 'weekday', type: 'varchar', transformer: weekDayTransformer })
  weekday: Weekday;

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
