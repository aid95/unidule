import { BadRequestException } from '@nestjs/common';

export class Title {
  value: string;

  constructor(value: string) {
    if (value.length == 0) {
      throw new BadRequestException('제목은 빈 문자열이 될 수 없다.');
    }
    this.value = value;
  }
}

export const titleTransformer = {
  to: (value: Title) => value.value,
  from: (value: string) => new Title(value),
};
