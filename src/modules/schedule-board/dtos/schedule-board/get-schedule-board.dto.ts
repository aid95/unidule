import { CourseItem } from '../course/get-courses.dto';

export class GetScheduleBoardDTO {
  readonly title: string;
  readonly courses: CourseItem[];

  constructor(title: string, courses: CourseItem[]) {
    this.title = title;
    this.courses = courses;
  }
}
