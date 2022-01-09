import { IsNumber } from 'class-validator';

export class GetCoursesRequestDTO {
  @IsNumber()
  offset: number;

  @IsNumber()
  limit: number;
}

export class CourseItem {
  courseId: string;
  end: Date;
  start: Date;
  title: string;
  weekday: string;

  constructor(
    courseId: string,
    title: string,
    end: Date,
    start: Date,
    weekday: string,
  ) {
    this.courseId = courseId;
    this.end = end;
    this.start = start;
    this.title = title;
    this.weekday = weekday;
  }
}
