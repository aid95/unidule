import { Inject, Injectable } from '@nestjs/common';
import { CourseEntity } from '../entities/course/course.entity';
import {
  CreateCourseRequestDTO,
  CreateCourseResponseDTO,
} from '../dtos/course/create-course.dto';
import { UpdateCourseRequestDto } from '../dtos/course/update-course.request.dto';
import { CourseDatabasePort } from '../entities/course/course.database.port';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('CoursesRepository') private readonly repo: CourseDatabasePort,
  ) {}

  async newCourses(req: CreateCourseRequestDTO) {
    const newCourse = await this.repo.save(CourseEntity.create(req));
    return new CreateCourseResponseDTO(newCourse.id);
  }

  getCourses(offset: number, limit: number) {
    return this.repo.pagination(offset, limit);
  }

  async deleteCourse(id: number) {
    const target = await this.repo.findById(id);
    target.delete();
    return this.repo.save(target);
  }

  async updateCourse(req: UpdateCourseRequestDto) {
    const target = await this.repo.findById(1);
    target.update(req);
    return this.repo.save(target);
  }
}
