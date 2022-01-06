import { Module } from '@nestjs/common';
import { ScheduleBoardModule } from './modules/schedule-board/schedule-board.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ScheduleBoardModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
