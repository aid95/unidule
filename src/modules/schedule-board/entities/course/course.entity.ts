import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../common/base/base.entity';
import { BadRequestException } from '@nestjs/common';
import { ScheduleBoardEntity } from '../schedule-board.entity';

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
  courseId: string;

  @Column({ name: 'end_date' })
  end: Date;

  @Column({ name: 'start_date' })
  start: Date;

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
    const checkCoursesDuration = (s: Date, e: Date) => s < e;
    const checkCourseIdFormat = (courseId: string) =>
      courseId.match(/^([0-9a-zA-Z]{4,5})-([0-9]{2})$/);

    if (!checkCoursesDuration(props.start, props.end)) {
      throw new BadRequestException(
        '수업 시작 시간은 종료 시간보다 같거나 빠를 수 없습니다.',
      );
    }

    if (!checkCourseIdFormat(props.courseId)) {
      throw new BadRequestException('강의 ID 형식이 틀립니다.');
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
