import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('airports')
export default class Airport {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  nickname: string;

  @Column('varchar')
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
