import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  to: string;

  @Column()
  message: string;

  @Column()
  status: string; // 'sent', 'failed', etc.
}
