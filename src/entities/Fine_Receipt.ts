import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class FineReceipt {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.fineReceipts)
  user: User;
}
