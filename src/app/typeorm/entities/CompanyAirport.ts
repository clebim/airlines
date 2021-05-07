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

@Entity('companies_airports')
export default class CompanyAirport {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('bigint')
  company_id: number;

  @Column('bigint')
  airport_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Airport)
  @JoinColumn({ name: 'airport_id' })
  airport: Airport;
}
