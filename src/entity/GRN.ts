import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { GRNDetail } from './GRN_Detail';

@Entity({ name: 'goods_delivery_note' })
export class GRN {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'total_worth', type: 'money' })
  totalWorth: number;

  @Column({ name: 'total_quantity' })
  totalQuantity: number;

  @OneToMany(() => GRNDetail, (GRNDetail) => GRNDetail.note)
  details: GRNDetail[];
}
