import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCourseRequestDTO,
  CreateCourseResponseDTO,
} from '../dtos/course/create-course.dto';
import { CoursesService } from '../service/courses.service';
import { GetCourseRequestDTO } from '../dtos/course/get-courses.dto';
import { UpdateCourseRequestDto } from '../dtos/course/update-course.request.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async courses(@Body() { offset, limit }: GetCourseRequestDTO) {
    return { courses: await this.coursesService.getCourses(offset, limit) };
  }

  @Post('/')
  async createCourse(
    @Body() req: CreateCourseRequestDTO,
  ): Promise<CreateCourseResponseDTO> {
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
