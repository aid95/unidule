import { Column, Entity, OneToMany } from 'typeorm';
import { BaseColumn } from '../../../../common/base/base-column.entity';
import { CourseEntity } from '../course/course.entity';
import { Title, titleTransformer } from '../vo/title.vo';

export type ScheduleBoardEssentialProperties = {
  readonly title: Title;
};

@Entity('schedule_board')
export class ScheduleBoardEntity extends BaseColumn {
  @Column({ name: 'title', type: 'varchar', transformer: titleTransformer })
  title: Title;

  @OneToMany((type) => CourseEntity, (course) => course.scheduleBoard)
  courses: CourseEntity[];

  private constructor() {
    super();
  }

  static create(props: ScheduleBoardEssentialProperties) {
    const result = new ScheduleBoardEntity();
    result.title = props.title;
    return result;
  }
}
