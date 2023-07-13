import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entities';
import { GDN } from '../../gdns/entities/gdn.entity';

@Entity({ name: 'goods_delivery_note_detail' })
export class GDNDetail {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Book, (book) => book.GRNDetails, { cascade: true })
  book: Book;

  @Column()
  bookISBN: string;

  @ManyToOne(() => GDN, (GRN) => GRN.details)
  note: GDN;

  @Column()
  noteId: string;

  @Column()
  quantity: number;

  @Column({ type: 'money' })
  price: number;
}
