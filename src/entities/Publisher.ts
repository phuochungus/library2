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
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
