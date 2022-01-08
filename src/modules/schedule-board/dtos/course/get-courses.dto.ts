import { IsNumber } from 'class-validator';

export class GetCourseRequestDTO {
  @IsNumber()
  offset: number;

  @IsNumber()
  limit: number;
}

export class GetCourseResponseDTO {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
