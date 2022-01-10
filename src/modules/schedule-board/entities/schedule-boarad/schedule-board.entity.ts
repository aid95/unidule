import { Column, Entity, OneToMany } from 'typeorm';
import { BaseColumn } from '../../../../common/base/base-column.entity';
import { CourseEntity } from '../course/course.entity';
import { BadRequestException } from '@nestjs/common';

export type ScheduleBoardEssentialProperties = {
  readonly title: string;
};

@Entity('schedule_board')
export class ScheduleBoardEntity extends BaseColumn {
  @Column({ name: 'title' })
  title: string;

  @OneToMany((type) => CourseEntity, (course) => course.scheduleBoard, {
    lazy: true,
    cascade: true,
  })
  courses: CourseEntity[];

  private constructor() {
    super();
  }

  static create(props: ScheduleBoardEssentialProperties) {
    ScheduleBoardEntity.validate(props);

    const result = new this();
    result.title = props.title;
    return result;
  }

  private static validate({ title }: ScheduleBoardEssentialProperties) {
    const isEmpty = (s: string) => s.length == 0;

    if (isEmpty(title)) {
      throw new BadRequestException('시간표 제목은 공백이 될 수 없습니다.');
    }
  }
}
