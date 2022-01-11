import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleBoardEntity } from '../entities/schedule-boarad/schedule-board.entity';
import { Repository } from 'typeorm';
import { UpdateScheduleBoardRequestDto } from '../dtos/schedule-board/update-schedule-board.request.dto';
import { Title } from '../entities/vo/title.vo';
import { NumberIdResponse } from '../controller/schedule-board.controller';
import { GetScheduleBoardDTO } from '../dtos/schedule-board/get-schedule-board.dto';
import { CourseItem } from '../dtos/course/get-courses.dto';

@Injectable()
export class ScheduleBoardService {
  constructor(
    @InjectRepository(ScheduleBoardEntity)
    private readonly repo: Repository<ScheduleBoardEntity>,
  ) {}

  newScheduleBoard(title: string) {
    return this.repo.save(
      ScheduleBoardEntity.create({ title: new Title(title) }),
    );
  }

  async getScheduleBoard(id: number): Promise<GetScheduleBoardDTO> {
    const schedule = await this.repo.findOne(id, { relations: ['courses'] });
    return new GetScheduleBoardDTO(
      schedule.title.value,
      schedule.courses.map(
        (course) =>
          new CourseItem(
            course.courseId.value,
            course.title.value,
            course.weekday.value,
            course.duration.start,
            course.duration.end,
          ),
      ),
    );

    /*
    return new GetScheduleBoardDTO(
      scheduleBoardEntity.title.value,
      scheduleBoardEntity.courses.map(
        (course) =>
          new CourseItem(
            course.courseId.value,
            course.title.value,
            course.weekday.value,
            course.duration.start,
            course.duration.end,
          ),
      ),
    );
     */
  }

  async updateScheduleBoard({
    id,
    title,
  }: UpdateScheduleBoardRequestDto): Promise<NumberIdResponse> {
    const target = await this.repo.findOne(id);
    target.title = new Title(title);
    return { id: (await this.repo.save(target)).id };
  }

  async deleteSchedule(id: number): Promise<NumberIdResponse> {
    const target = await this.repo.findOne(id);
    target.markDeleted();
    return { id: (await this.repo.save(target)).id };
  }
}
