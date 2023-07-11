import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';

@Entity()
export class ReturnReceiptDetail {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Book, (Book) => Book.returnReceiptDetails)
  book: Book;
}
