import { Module } from '@nestjs/common';
import { ScheduleBoardController } from './schedule-board.controller';
import { ScheduleBoardService } from './schedule-board.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [ScheduleBoardController, CoursesController],
  providers: [ScheduleBoardService, CoursesService],
})
export class ScheduleBoardModule {}
