import { IsNumber } from 'class-validator';
import { DurationEntity } from '../../entities/common/duration.entity';

export class GetCoursesRequestDTO {
  @IsNumber()
  offset: number;

  @IsNumber()
  limit: number;
}

export class CourseItem {
  courseId: string;
  title: string;
  duration: DurationEntity;
  weekday: string;

  constructor(
    courseId: string,
    title: string,
    duration: DurationEntity,
    weekday: string,
  ) {
    this.courseId = courseId;
    this.duration = duration;
    this.title = title;
    this.weekday = weekday;
  }
}
