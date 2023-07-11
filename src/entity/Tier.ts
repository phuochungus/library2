import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
