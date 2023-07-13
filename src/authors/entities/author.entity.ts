import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entities';
import { Sign } from 'crypto';

@Entity()
export class Author {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  @JoinTable()
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
