import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleBoardEntity } from '../entities/schedule-boarad/schedule-board.entity';
import { Repository } from 'typeorm';
import { UpdateScheduleBoardRequestDto } from '../dtos/schedule-board/update-schedule-board.request.dto';

@Injectable()
export class ScheduleBoardService {
  constructor(
    @InjectRepository(ScheduleBoardEntity)
    private readonly repo: Repository<ScheduleBoardEntity>,
  ) {}

  newScheduleBoard(title: string) {
    return this.repo.save(this.repo.create({ title }));
  }

  getScheduleBoard(id: number) {
    return this.repo.findOne({ id });
  }

  updateScheduleBoard(req: UpdateScheduleBoardRequestDto) {
    return this.repo.save(req);
  }

  deleteSchedule(id: number) {
    return this.repo.delete({ id });
  }
}
