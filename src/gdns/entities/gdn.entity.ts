import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { GDNDetail } from '../../gdn_details/entities/GDN_Detail.entity';

@Entity({ name: 'goods_delivery_note' })
export class GDN {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'total_worth', type: 'money' })
  totalWorth: number;

  @Column({ name: 'total_quantity' })
  totalQuantity: number;

  @OneToMany(() => GDNDetail, (GRNDetail) => GRNDetail.note)
  details: GDNDetail[];
}
