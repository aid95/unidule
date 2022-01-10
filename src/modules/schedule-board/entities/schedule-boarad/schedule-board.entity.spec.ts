import { ScheduleBoardEntity } from './schedule-board.entity';
import { BadRequestException } from '@nestjs/common';

describe('', () => {
  it('시간표는 빈 제목을 가질 수 없다.', () => {
    expect(() => {
      ScheduleBoardEntity.create({ title: '' });
    }).toThrow(BadRequestException);
  });
});
