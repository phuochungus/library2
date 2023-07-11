import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BorrowReceiptDetail } from './Borrow_Receipt_Detail';
import { ReturnReceiptDetail } from './Return_Receipt_Detail';
import { Publisher } from './Publisher';
import { Author } from './Author';
import { Genre } from './Genre';
import { UserToBook } from './UserToBook';
import { GRNDetail } from './GRN_Detail';

@Entity({ orderBy: { importedDate: 'DESC' } })
export class Book {
  @PrimaryColumn()
  ISBN: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ name: 'published_year' })
  publishedYear: number;

  @CreateDateColumn({ name: 'imported_date' })
  importedDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @OneToMany(
    () => BorrowReceiptDetail,
    (borrowReceiptDetail) => borrowReceiptDetail.book,
    { cascade: true },
  )
  borrowReceiptDetails: BorrowReceiptDetail[];

  @OneToMany(
    () => ReturnReceiptDetail,
    (returnReceiptDetail) => returnReceiptDetail.book,
    { cascade: true },
  )
  returnReceiptDetails: ReturnReceiptDetail[];

  @ManyToOne(() => Publisher, (publisher) => publisher.books, { cascade: true })
  publisher: Publisher;

  @ManyToOne(() => Author, (author) => author.books, { cascade: true })
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books, { cascade: true })
  genres: Genre[];

  @OneToMany(() => UserToBook, (userToBook) => userToBook.book)
  userToBooks: UserToBook[];

  @OneToMany(() => GRNDetail, (GRNDetail) => GRNDetail.book)
  GRNDetails: GRNDetail[];
}
