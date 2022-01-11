export class CourseItem {
  courseId: string;
  title: string;
  weekday: string;
  start: Date;
  end: Date;

  constructor(
    courseId: string,
    title: string,
    weekday: string,
    start: Date,
    end: Date,
  ) {
    this.courseId = courseId;
    this.title = title;
    this.weekday = weekday;
    this.start = start;
    this.end = end;
  }
}
