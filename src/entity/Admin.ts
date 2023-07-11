import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
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

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
