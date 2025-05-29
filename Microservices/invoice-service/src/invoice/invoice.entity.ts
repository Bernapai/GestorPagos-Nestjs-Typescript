// invoice.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  paymentId: string;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;

  @Column()
  pdfUrl: string; // o filePath si lo guardás localmente

  @CreateDateColumn()
  createdAt: Date;
}
