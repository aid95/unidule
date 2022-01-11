import { BadRequestException } from '@nestjs/common';

export class CourseId {
  readonly value: string;

  constructor(value: string) {
    if (!CourseId.validate(value)) {
      throw new BadRequestException('잘못된 형식의 강의 ID입니다.');
    }
    this.value = value;
  }

  private static validate(value: string) {
    return value.match(/^([0-9A-Z]{4,5})-([0-9]{2})$/);
  }
}

export const courseIdTransformer = {
  to: (value: CourseId) => value.value,
  from: (value: string) => new CourseId(value),
};
