import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BorrowReceiptDetail } from './Borrow_Receipt_Detail';

@Entity({ orderBy: { id: 'DESC' } })
export class BorrowReceipt {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.borrowReceipt)
  user: User;

  @OneToMany(
    () => BorrowReceiptDetail,
    (borrowReceiptDetail) => borrowReceiptDetail.receipt,
  )
  details: BorrowReceiptDetail[];

  @Column({ name: 'total_quantity' })
  totalQuantity: number;
}
