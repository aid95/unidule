import { CourseEntity } from './course.entity';
import { BadRequestException } from '@nestjs/common';

describe('Course entity', () => {
  it.each([
    { start: '2019-11-13T00:57:06.943Z', end: '2019-11-13T00:57:06.943Z' },
    { start: '2019-11-13T00:57:06.943Z', end: '2019-11-13T00:48:06.943Z' },
  ])('시작 시간은 종료 시간보다 같거나 빠를 수 없다.', (dates) => {
    const { start, end } = dates;
    expect(() => {
      CourseEntity.create({
        courseId: '12312-12',
        title: 'C programming',
        weekday: 'MON',
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
      });
    }).toThrow(BadRequestException);
  });

  it.each(['123-12', '1234-1', '@1234-12'])(
    '강의 식별 ID는 포맷을 지켜야 합니다.',
    (invalidCourseId) => {
      expect(() => {
        CourseEntity.create({
          courseId: invalidCourseId,
          title: 'C programming',
          weekday: 'MON',
          start: new Date(Date.parse('2019-11-13T00:47:06.943Z')),
          end: new Date(Date.parse('2019-11-13T01:48:06.943Z')),
        });
      }).toThrow(BadRequestException);
    },
  );
});
