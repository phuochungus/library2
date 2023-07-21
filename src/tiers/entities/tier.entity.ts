import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../entities';

@Entity()
export class Tier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.tier)
  users: User[];

  @Column({ type: 'money' })
  pricePerMonth: number;

  @Column({ type: 'money', nullable: true, name: 'price_per_day_of_each_book' })
  pricePerDayEachBook: number;

  @Column({ name: 'maximum_number_of_book_borrow', nullable: true })
  maxBorrow: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
