import { CourseEntity } from './course.entity';
import { CourseId } from '../vo/course-id.vo';
import { Title } from '../vo/title.vo';
import { Weekday } from '../vo/weekday.vo';
import { DurationEntity } from '../common/duration.entity';

describe('Course entity', () => {
  it('시작 시간은 종료 시간보다 같거나 빠를 수 없다.', () => {
    const course = CourseEntity.create({
      courseId: new CourseId('12312-12'),
      title: new Title('C programming'),
      weekday: new Weekday('MON'),
      duration: new DurationEntity(
        new Date(Date.parse('2019-11-13T00:57:06.943Z')),
        new Date(Date.parse('2019-11-13T01:57:06.943Z')),
      ),
    });
    expect(course.courseId).toEqual(new CourseId('12312-12'));
    expect(course.title).toEqual(new Title('C programming'));
    expect(course.weekday).toEqual(new Weekday('MON'));
  });
});
