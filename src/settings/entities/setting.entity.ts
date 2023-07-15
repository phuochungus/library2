import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column({ name: 'feature_description' })
  featureDescription: string;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
