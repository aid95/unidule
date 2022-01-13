import { Inject, Injectable } from '@nestjs/common';
import { CourseEntity } from '../entities/course/course.entity';
import { CreateCourseRequestDTO } from '../dtos/course/create-course.dto';
import { UpdateCourseRequestDTO } from '../dtos/course/update-course.request.dto';
import { CourseDatabasePort } from '../entities/course/course.database.port';
import { CourseItem } from '../dtos/course/get-courses.dto';
import {
  Page,
  PaginationResponseDTO,
} from '../../../common/dtos/pagination.dto';
import { ScheduleInjectToken } from '../interface/schedule.inject-token';
import { DurationEntity } from '../entities/common/duration.entity';
import { IdResponse } from '../../../common/dtos/id.response.dto';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(ScheduleInjectToken.repositories.CoursesRepository)
    private readonly repo: CourseDatabasePort,
  ) {}

  async newCourses(req: CreateCourseRequestDTO): Promise<IdResponse<number>> {
    const newCourse = await this.repo.save(
      CourseEntity.create({
        courseId: req.courseId,
        title: req.title,
        weekday: req.weekday,
        duration: DurationEntity.create({ start: req.start, end: req.end }),
      }),
    );
    return new IdResponse(newCourse.id);
  }

  async getCourses(offset: number, limit: number) {
    const [courses, total] = await this.repo.pagination(offset, limit);
    return new PaginationResponseDTO<CourseItem>(
      courses.map((course) => {
        return new CourseItem(
          course.courseId,
          course.title,
          course.weekday,
          course.duration.start,
          course.duration.end,
        );
      }),
      new Page(total, offset, limit),
    );
  }

  async deleteCourse(id: number): Promise<IdResponse<number>> {
    const target = await this.repo.findById(id);
    target.markDeleted();
    return new IdResponse((await this.repo.save(target)).id);
  }

  async updateCourse(req: UpdateCourseRequestDTO): Promise<IdResponse<number>> {
    const target = await this.repo.findById(1);
    return new IdResponse((await this.repo.save(target)).id);
  }
}
