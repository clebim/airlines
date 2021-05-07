import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Airport from './Airport';
import Company from './Company';

@Entity('flights')
export default class Flight {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('bigint')
  company_id: number;

  @Column('bigint')
  airport_origin_id: number;

  @Column('bigint')
  airport_destiny_id: number;

  @Column('varchar')
  day_week: string;

  @Column('time')
  exit_at: string;

  @Column('varchar')
  airplane_model: string;

  @Column('decimal')
  price: number;

  @Column('int')
  capacity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Airport, airport => airport.flight_origin)
  @JoinColumn({ name: 'airport_origin_id' })
  airport_origin: Airport;

  @ManyToOne(() => Airport, airport => airport.flight_destiny)
  @JoinColumn({ name: 'airport_destiny_id' })
  airport_destiny: Airport;

  @ManyToOne(() => Company, company => company.flight)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
