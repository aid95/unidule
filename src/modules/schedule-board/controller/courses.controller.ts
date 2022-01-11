import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCourseRequestDTO } from '../dtos/course/create-course.dto';
import { CoursesService } from '../service/courses.service';
import { CourseItem } from '../dtos/course/get-courses.dto';
import { UpdateCourseRequestDTO } from '../dtos/course/update-course.request.dto';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/dtos/pagination.dto';
import { IdResponse } from '../../../common/dtos/id.response.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async courses(
    @Body() { offset, limit }: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CourseItem>> {
    return this.coursesService.getCourses(offset, limit);
  }

  @Post('/')
  async createCourse(
    @Body() req: CreateCourseRequestDTO,
  ): Promise<IdResponse<number>> {
    return this.coursesService.newCourses(req);
  }

  @Delete('/:id')
  deleteCourse(@Param() id: number): Promise<IdResponse<number>> {
    return this.coursesService.deleteCourse(id);
  }

  @Put('/')
  updateCourse(
    @Body() req: UpdateCourseRequestDTO,
  ): Promise<IdResponse<number>> {
    return this.coursesService.updateCourse(req);
  }
}
