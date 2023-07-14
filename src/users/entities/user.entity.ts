import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Index,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Tier } from '../../tiers/entities/tier.entity';
import { BorrowReceipt } from '../../entities/Borrow_Receipt';
import { FineReceipt } from '../../entities/Fine_Receipt';
import { UserToBook } from '../../entities/UserToBook';
import { Exclude } from 'class-transformer';

@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  birthday: Date;

  @Column()
  address: string;

  @Column({ name: 'valid_until' })
  validUntil: Date;

  @Column({ name: 'number_of_borrowing_books', default: 0 })
  numberOfBorrowingBooks: number = 0;

  @Column({ type: 'money', default: 0 })
  debt: number = 0;

  @ManyToOne(() => Tier)
  @JoinColumn({ name: 'tier_id' })
  tier: Tier;

  @Column({ name: 'tier_id' })
  tierId: number;

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

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate?: Date;
}
