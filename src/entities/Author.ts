import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
