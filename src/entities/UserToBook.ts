import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class UserToBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userToBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.userToBooks)
  book: Book;

  @Column({ default: 1 })
  quantity: number;
}
