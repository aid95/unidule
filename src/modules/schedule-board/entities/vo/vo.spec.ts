import { Title } from './title.vo';
import { BadRequestException } from '@nestjs/common';
import { CourseId } from './course-id.vo';
import { Weekday } from './weekday.vo';

describe('', () => {
  it('Title은 빈 문자열을 받을 수 없다.', () => {
    expect(() => {
      new Title('');
    }).toThrow(BadRequestException);
  });

  it.each(['123-12', '1234-1', '@1234-12'])(
    '강의 식별 ID는 포맷을 지켜야 합니다.',
    (invalidCourseId) => {
      expect(() => {
        new CourseId(invalidCourseId);
      }).toThrow(BadRequestException);
    },
  );

  it.each(['POWER', 'JS', 'TOP'])(
    'Weekday는 지정된 날짜 이외의 날짜를 받을 수 없다.',
    (invalidWeekday) => {
      expect(() => {
        new Weekday(invalidWeekday);
      }).toThrow(BadRequestException);
    },
  );
});
