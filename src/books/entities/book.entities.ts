import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BorrowReceiptDetail } from '../../entities/Borrow_Receipt_Detail';
import { ReturnReceiptDetail } from '../../entities/Return_Receipt_Detail';
import { Publisher } from '../../publishers/entities/publisher.entitiy';
import { Author } from '../../authors/entities/author.entity';
import { Genre } from '../../genres/entities/genre.entity';
import { UserToBook } from '../../entities/UserToBook';
import { GDNDetail } from '../../entities/GDN_Detail';
import { IsDate, IsISBN, IsInt, IsString, Min } from 'class-validator';

@Entity({ orderBy: { importedDate: 'DESC' } })
export class Book {
  @PrimaryColumn()
  @IsISBN()
  ISBN: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  @Min(0)
  quantity: number;

  @Column({ name: 'published_year' })
  @IsInt()
  @Min(1)
  publishedYear: number;

  @CreateDateColumn({ name: 'imported_date' })
  @IsDate()
  importedDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  @IsDate()
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

  @Column()
  publisherId: string;

  @ManyToMany(() => Author, (author) => author.books, { cascade: true })
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => UserToBook, (userToBook) => userToBook.book, {
    nullable: true,
  })
  userToBooks: UserToBook[];

  @OneToMany(() => GDNDetail, (GRNDetail) => GRNDetail.book)
  GRNDetails: GDNDetail[];
}
