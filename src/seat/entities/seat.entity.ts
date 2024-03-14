import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity({
  name: 'seat',
})
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  @Column()
  price: number;

  // @OneToMany(() => Reservation, (reservation) => reservation.seat)
  // reservations: Reservation[];
}
