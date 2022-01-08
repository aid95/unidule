import { IsDate, IsString } from 'class-validator';

export class CreateCourseRequestDTO {
  @IsString()
  readonly courseId: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly weekday: string;

  @IsDate()
  readonly start: Date;

  @IsDate()
  readonly end: Date;
}

export class CreateCourseResponseDTO {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
