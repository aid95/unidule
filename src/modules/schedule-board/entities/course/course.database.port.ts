import { CourseEntity } from './course.entity';

export interface CourseDatabasePort {
  save(entity: CourseEntity): Promise<CourseEntity>;
  findById(id: number): Promise<CourseEntity>;
  pagination(skip: number, take: number): Promise<CourseEntity[]>;
}
