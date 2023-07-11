import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Publisher {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
