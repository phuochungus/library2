import {
  Column,
  CreateDateColumn,
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

  @Column()
  description: string;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
