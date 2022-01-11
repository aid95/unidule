import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleBoardService } from '../service/schedule-board.service';
import { CreateScheduleBoardRequestDto } from '../dtos/schedule-board/create-schedule-board.request.dto';
import { UpdateScheduleBoardRequestDto } from '../dtos/schedule-board/update-schedule-board.request.dto';
import { IdResponse } from '../../../common/dtos/id.response.dto';

export type NumberIdResponse = IdResponse<number>;

@Controller('schedules')
export class ScheduleBoardController {
  constructor(private readonly service: ScheduleBoardService) {}

  @Get('/:id')
  async getScheduleBoard(@Param() id: number) {
    return this.service.getScheduleBoard(id);
  }

  @Post('/')
  createScheduleBoard(
    @Body() { title }: CreateScheduleBoardRequestDto,
  ): Promise<NumberIdResponse> {
    return this.service.newScheduleBoard(title);
  }

  @Put('/')
  updateScheduleBoard(
    @Body() req: UpdateScheduleBoardRequestDto,
  ): Promise<NumberIdResponse> {
    return this.service.updateScheduleBoard(req);
  }

  @Delete('/:id')
  deleteScheduleBoard(@Param() id: number): Promise<NumberIdResponse> {
    return this.service.deleteSchedule(id);
  }
}
