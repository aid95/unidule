import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCourseRequestDto } from './dtos/create-course.request.dto';
import { CoursesService } from './courses.service';
import { GetCoursesRequestDto } from './dtos/get-courses.request.dto';
import { UpdateCourseRequestDto } from './dtos/update-course.request.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async courses(@Body() { offset, limit }: GetCoursesRequestDto) {
    return { courses: await this.coursesService.getCourses(offset, limit) };
  }

  @Post('/')
  createCourse(@Body() req: CreateCourseRequestDto) {
    return this.coursesService.newCourses(req);
  }

  @Delete('/:id')
  deleteCourse(@Param() id: number) {
    return this.coursesService.deleteCourse(id);
  }

  @Put('/')
  updateCourse(@Body() req: UpdateCourseRequestDto) {
    return this.coursesService.updateCourse(req);
  }
}
