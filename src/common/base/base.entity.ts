import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  readonly id: number;

  @CreateDateColumn({ name: 'created_at' })
  protected createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  protected updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  private deletedAt?: Date;

  delete() {
    this.deletedAt = new Date();
  }
}
