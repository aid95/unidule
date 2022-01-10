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
import { DurationEntity } from '../entities/common/duration.entity';
import { Title } from '../entities/vo/title.vo';
import { CourseId } from '../entities/vo/course-id.vo';
import { Weekday } from '../entities/vo/weekday.vo';
import { IdResponse } from '../../../common/dtos/id.response.dto';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(ScheduleInjectToken.repositories.CoursesRepository)
    private readonly repo: CourseDatabasePort,
  ) {}

  async newCourses(req: CreateCourseRequestDTO) {
    const newCourse = await this.repo.save(
      CourseEntity.create({
        courseId: new CourseId(req.courseId),
        title: new Title(req.title),
        weekday: new Weekday(req.weekday),
        duration: new DurationEntity(req.start, req.end),
      }),
    );
    return new CreateCourseResponseDTO(newCourse.id);
  }

  async getCourses(offset: number, limit: number) {
    const [courses, total] = await this.repo.pagination(offset, limit);
    return new PaginationDTO<CourseItem>(
      courses.map((course) => {
        return new CourseItem(
          course.courseId.value,
          course.title.value,
          course.weekday.value,
          course.duration.start,
          course.duration.end,
        );
      }),
      new Page(total, Math.abs(offset - limit)),
    );
  }

  async deleteCourse(id: number) {
    const target = await this.repo.findById(id);
    target.delete();
    return new IdResponse<number>((await this.repo.save(target)).id);
  }

  async updateCourse(req: UpdateCourseRequestDTO) {
    const target = await this.repo.findById(1);
    // target.update(req);
    return new IdResponse((await this.repo.save(target)).id);
  }
}
