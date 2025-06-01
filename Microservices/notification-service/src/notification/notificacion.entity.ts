import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ nullable: true })
  providerMessageId?: string;

  @CreateDateColumn()
  sentAt: Date;
}
