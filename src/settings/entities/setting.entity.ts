import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column({ name: 'feature_description' })
  featureDescription: string;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
