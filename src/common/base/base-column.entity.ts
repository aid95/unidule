import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseColumn {
  @PrimaryGeneratedColumn({ name: 'id' })
  readonly id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  protected createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  protected updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  private deletedAt?: Date;

  markDeleted() {
    this.deletedAt = new Date();
  }
}
