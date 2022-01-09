import { Inject, Injectable } from '@nestjs/common';
import { CourseEntity } from '../entities/course/course.entity';
import {
  CreateCourseRequestDTO,
  CreateCourseResponseDTO,
} from '../dtos/course/create-course.dto';
import { UpdateCourseRequestDTO } from '../dtos/course/update-course.request.dto';
import { CourseDatabasePort } from '../entities/course/course.database.port';
import { CourseItem } from '../dtos/course/get-courses.dto';
import { Page, PaginationDTO } from '../../../common/dtos/pagination.dto';
import { ScheduleInjectToken } from '../interface/schedule.inject-token';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(ScheduleInjectToken.repositories.CoursesRepository)
    private readonly repo: CourseDatabasePort,
  ) {}

  async newCourses(req: CreateCourseRequestDTO) {
    const newCourse = await this.repo.save(CourseEntity.create(req));
    return new CreateCourseResponseDTO(newCourse.id);
  }

  async getCourses(offset: number, limit: number) {
    const [courses, total] = await this.repo.pagination(offset, limit);
    return new PaginationDTO<CourseItem>(
      courses.map((course) => {
        const props = course.copy();
        return new CourseItem(
          props.courseId,
          props.title,
          props.start,
          props.end,
          props.weekday,
        );
      }),
      new Page(total, Math.abs(offset - limit)),
    );
  }

  async deleteCourse(id: number) {
    const target = await this.repo.findById(id);
    target.delete();
    return this.repo.save(target);
  }

  async updateCourse(req: UpdateCourseRequestDTO) {
    const target = await this.repo.findById(1);
    target.update(req);
    return this.repo.save(target);
  }
}
