import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

import bcrypt from 'bcryptjs';
import BlacklistJwt from './BlacklistJwt';
import Flight from './Flight';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  fantasy_name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar')
  cnpj: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }

  @OneToMany(() => BlacklistJwt, token => token.company)
  tokensBlacklist: BlacklistJwt[];

  @OneToMany(() => Flight, flight => flight.company)
  flight: Flight;
}
