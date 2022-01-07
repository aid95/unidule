import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleBoardService } from './schedule-board.service';
import { CreateScheduleBoardRequestDto } from './dtos/create-schedule-board.request.dto';
import { UpdateScheduleBoardRequestDto } from './dtos/update-schedule-board.request.dto';

@Controller('schedules')
export class ScheduleBoardController {
  constructor(private readonly service: ScheduleBoardService) {}

  @Get('/:id')
  getScheduleBoard(@Param() id: number) {
    return this.service.getScheduleBoard(id);
  }

  @Post('/')
  createScheduleBoard(@Body() { title }: CreateScheduleBoardRequestDto) {
    return this.service.newScheduleBoard(title);
  }

  @Put('/')
  updateScheduleBoard(@Body() req: UpdateScheduleBoardRequestDto) {
    return this.service.updateScheduleBoard(req);
  }

  @Delete('/:id')
  deleteScheduleBoard(@Param() id: number) {
    return this.service.deleteSchedule(id);
  }
}
