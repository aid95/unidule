import { Module } from '@nestjs/common';
import { ScheduleBoardController } from './controller/schedule-board.controller';
import { ScheduleBoardService } from './service/schedule-board.service';
import { CoursesController } from './controller/courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course/course.entity';
import { CoursesService } from './service/courses.service';
import { ScheduleBoardEntity } from './entities/schedule-boarad/schedule-board.entity';
import { CourseTypeorm } from './database/course.typeorm';
import { ScheduleInjectToken } from './interface/schedule.inject-token';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, ScheduleBoardEntity])],
  controllers: [ScheduleBoardController, CoursesController],
  providers: [
    ScheduleBoardService,
    CoursesService,
    {
      provide: ScheduleInjectToken.repositories.CoursesRepository,
      useClass: CourseTypeorm,
    },
  ],
})
export class ScheduleBoardModule {}
