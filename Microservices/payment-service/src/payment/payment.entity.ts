import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;

  @Column()
  userId: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
