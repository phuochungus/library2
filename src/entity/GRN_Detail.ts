import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';
import { GRN } from './GRN';

@Entity({ name: 'goods_delivery_note_detail' })
export class GRNDetail {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.GRNDetails)
  book: Book;

  @ManyToOne(() => GRN, (GRN) => GRN.details)
  note: GRN;
}
