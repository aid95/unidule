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
import {
  CourseItem,
  GetCoursesRequestDTO,
} from '../dtos/course/get-courses.dto';
import { UpdateCourseRequestDTO } from '../dtos/course/update-course.request.dto';
import { PaginationDTO } from '../../../common/dtos/pagination.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async courses(
    @Body() { offset, limit }: GetCoursesRequestDTO,
  ): Promise<PaginationDTO<CourseItem>> {
    return this.coursesService.getCourses(offset, limit);
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
  updateCourse(@Body() req: UpdateCourseRequestDTO) {
    return this.coursesService.updateCourse(req);
  }
}
