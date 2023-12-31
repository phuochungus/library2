import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entities';

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
