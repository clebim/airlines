import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Flight from './Flight';

@Entity('tickets')
export default class Ticket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  ticket_id: string;

  @Column('varchar')
  passenger_name: string;

  @Column('date')
  birth_date: Date;

  @Column('bigint')
  flight_id: number;

  @Column('date')
  flight_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToOne(() => Flight, flight => flight.tickets)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;
}
