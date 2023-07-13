import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  @JoinTable()
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
