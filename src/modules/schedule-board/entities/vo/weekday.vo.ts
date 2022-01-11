import { BadRequestException } from '@nestjs/common';

export class Weekday {
  static readonly weekday = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  readonly value: string;

  constructor(value: string) {
    if (!Weekday.weekday.includes(value)) {
      throw new BadRequestException('잘못된 형식의 날짜입니다.');
    }
    this.value = value;
  }
}

export const weekDayTransformer = {
  to: (value: Weekday) => value.value,
  from: (value: string) => new Weekday(value),
};
