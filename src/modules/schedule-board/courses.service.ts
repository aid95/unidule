import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseRequestDto } from './dtos/create-course.request.dto';
import { UpdateCourseRequestDto } from './dtos/update-course.request.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly repo: Repository<CourseEntity>,
  ) {}

  newCourses(req: CreateCourseRequestDto) {
    return this.repo.save(this.repo.create({ ...req }));
  }

  getCourses(offset: number, limit: number) {
    return this.repo.find({ skip: offset, take: limit });
  }

  deleteCourse(id: number) {
    return this.repo.delete({ id });
  }

  updateCourse(req: UpdateCourseRequestDto) {
    return this.repo.save({ ...req });
  }
}
