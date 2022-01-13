import { Column, Index } from 'typeorm';

export type DurationEssentialProperties = {
  start: Date;
  end: Date;
};

@Index('ix_duration', ['start', 'end'])
export class DurationEntity {
  @Column({ name: 'start', type: 'timestamp' })
  start: Date;

  @Column({ name: 'end', type: 'timestamp' })
  end: Date;

  static create(props: DurationEssentialProperties): DurationEntity {
    const result = new DurationEntity();
    result.start = props.start;
    result.end = props.end;
    return result;
  }
}
