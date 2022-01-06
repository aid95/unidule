import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COURSES')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'COURSE_ID' })
  courseId: string;

  @Column({ name: 'TITLE' })
  title: string;

  @Column({ name: 'START_DATE' })
  start: Date;

  @Column({ name: 'END_DATE' })
  end: Date;
}
