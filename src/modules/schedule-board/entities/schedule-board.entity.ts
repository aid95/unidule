import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCHEDULE_BOARD')
export class ScheduleBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'TITLE' })
  title: string;
}
