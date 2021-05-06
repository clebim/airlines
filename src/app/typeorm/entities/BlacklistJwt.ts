import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Company from './Company';

@Entity('blacklist_jwt')
export default class BlacklistJwt {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  token_id: string;

  @Column('bigint')
  company_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Company, company => company.tokensBlacklist)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
