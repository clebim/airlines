import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Flight from './Flight';

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

  @OneToMany(() => Flight, flight => flight.airport_origin)
  flight_origin: Flight;

  @OneToMany(() => Flight, flight => flight.airport_destiny)
  flight_destiny: Flight;
}
