import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from '../books/entities/book.entities';
import { BorrowReceipt } from './Borrow_Receipt';

@Entity()
export class BorrowReceiptDetail {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.borrowReceiptDetails)
  book: Book;

  @Column()
  quantity: number;

  @ManyToOne(() => BorrowReceipt, (borrowReceipt) => borrowReceipt.details)
  receipt: BorrowReceipt;

  @Column({ name: 'number_of_borrowed_days' })
  numberOfBorrowedDays: number;

  @Column({ name: 'number_of_fined_days' })
  numberOfFinedDays: number;
}
