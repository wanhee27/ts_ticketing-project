import { Concert } from '../../concert/entities/concert.entity';
import { User } from '../../user/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column({ type: 'bigint', name: 'userId' })
  userId: number;

  // @Column()
  // seatId: number;

  @Column()
  concertId: number;

  // @Column()
  // dateId: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservation)
  @JoinColumn({ name: 'concertId' })
  concert: Concert;
}
