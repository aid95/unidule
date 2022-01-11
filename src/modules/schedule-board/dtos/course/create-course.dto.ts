import { IsDateString, IsString } from 'class-validator';

export class CreateCourseRequestDTO {
  @IsString()
  readonly courseId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly weekday: string;

  @IsDateString()
  readonly start: Date;

  @IsDateString()
  readonly end: Date;
}
