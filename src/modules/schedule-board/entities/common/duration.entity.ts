import { Column, Index } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Index('ix_duration', ['start', 'end'])
export class DurationEntity {
  @Column({ name: 'start', type: 'timestamp' })
  start: Date;

  @Column({ name: 'end', type: 'timestamp' })
  end: Date;

  constructor(start: Date, end: Date) {
    if (end <= start) {
      throw new BadRequestException(
        '시작 시간이 종료 시간보다 같거나 늦을 수 없습니다.',
      );
    }
    this.start = start;
    this.end = end;
  }
}
