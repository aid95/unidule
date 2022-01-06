import { Controller, Get } from '@nestjs/common';
import { ScheduleBoardService } from './schedule-board.service';

@Controller('schedules')
export class ScheduleBoardController {
  constructor(private readonly service: ScheduleBoardService) {}

  @Get('/courses')
  createCourse(req: { start: Date; end: Date; id: string; title: string }) {
    return { id: 1, ...req };
  }
}
