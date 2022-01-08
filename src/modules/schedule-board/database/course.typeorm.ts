import { CourseDatabasePort } from '../entities/course/course.database.port';
import { CourseEntity } from '../entities/course/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CourseTypeorm implements CourseDatabasePort {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly repo: Repository<CourseEntity>,
  ) {}

  findById(id: number): Promise<CourseEntity> {
    return this.repo
      .createQueryBuilder('c')
      .where('c.id = :id', { id })
      .andWhere('c.deleted_at IS NULL')
      .getOne();
  }

  save(entity: CourseEntity): Promise<CourseEntity> {
    return this.repo.save(entity);
  }

  pagination(skip: number, take: number): Promise<CourseEntity[]> {
    return this.repo
      .createQueryBuilder('c')
      .where('c.deleted_at IS NULL')
      .skip(skip)
      .take(take)
      .getMany();
  }
}
