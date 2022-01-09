import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../common/base/base.entity';
import { BadRequestException } from '@nestjs/common';

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
  @Column({ name: 'course_id', unique: true })
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

  copy(): CourseProperties {
    return {
      courseId: this.courseId,
      title: this.title,
      weekday: this.weekday,
      start: this.start,
      end: this.end,
    };
  }

  static create(props: CourseEssentialProperties) {
    CourseEntity.validate(props);

    const entity = new CourseEntity();
    entity.courseId = props.courseId;
    entity.start = props.start;
    entity.end = props.end;
    entity.weekday = props.weekday;
    entity.title = props.title;
    return entity;
  }

  private static validate(props: CourseEssentialProperties) {
    if (props.end <= props.start) {
      throw new BadRequestException(
        '수업 시작 시간은 종료 시간보다 같거나 빠를 수 없습니다.',
      );
    }
  }

  update({ courseId, title, weekday, start, end }: CourseUpdateProperties) {
    this.courseId = courseId || this.courseId;
    this.title = title || this.title;
    this.weekday = weekday || this.weekday;
    this.start = start || this.start;
    this.end = end || this.end;
  }
}
