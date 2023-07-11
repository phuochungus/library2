import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
