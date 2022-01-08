import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../common/base/base.entity';

export type CourseEssentialProperties = Required<{
  readonly courseId: string;
  readonly title: string;
  readonly weekday: string;
  readonly start: Date;
  readonly end: Date;
}>;

export type CourseUpdateProperties = Partial<CourseEssentialProperties>;

export type CourseProperties = CourseEssentialProperties;

@Entity('courses')
export class CourseEntity extends BaseEntity {
  @Column({ name: 'course_id' })
  private courseId: string;

  @Column({ name: 'end_date' })
  private end: Date;

  @Column({ name: 'start_date' })
  private start: Date;

  @Column({ name: 'title' })
  private title: string;

  @Column({ name: 'weekday' })
  private weekday: string;

  private constructor() {
    super();
  }

  static create(props: CourseEssentialProperties) {
    const entity = new CourseEntity();
    entity.courseId = props.courseId;
    entity.start = props.start;
    entity.end = props.end;
    entity.weekday = props.weekday;
    entity.title = props.title;
    return entity;
  }

  update({ courseId, title, weekday, start, end }: CourseUpdateProperties) {
    this.courseId = courseId || this.courseId;
    this.title = title || this.title;
    this.weekday = weekday || this.weekday;
    this.start = start || this.start;
    this.end = end || this.end;
  }
}
