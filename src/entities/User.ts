import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tier } from './Tier';
import { BorrowReceipt } from './Borrow_Receipt';
import { FineReceipt as FineReceipt } from './Fine_Receipt';
import { UserToBook } from './UserToBook';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birthday: Date;

  @Column()
  address: string;

  @Column({ name: 'valid_until' })
  validUntil: Date;

  @Column({ name: 'number_of_borrowing_books' })
  numberOfBorrowingBooks: number;

  @Column({ type: 'money' })
  debt: number;

  @OneToOne(() => Tier)
  @JoinColumn()
  tier: Tier;

  @OneToMany(() => BorrowReceipt, (borrowReceipt) => borrowReceipt.user, {
    cascade: true,
  })
  borrowReceipt: BorrowReceipt[];

  @OneToMany(() => FineReceipt, (fineReceipt) => fineReceipt.user, {
    cascade: true,
  })
  fineReceipts: FineReceipt[];

  @OneToMany(() => UserToBook, (userToBook) => userToBook.user, {
    nullable: true,
  })
  userToBooks: UserToBook[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
