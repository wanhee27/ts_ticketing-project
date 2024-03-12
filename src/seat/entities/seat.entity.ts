import { Date } from '../../date/entities/date.entity';
// import { SeatStatus } from '../types/seat.status';
// import { SeatType } from '../types/seat.type';

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
  name: 'seat',
})
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  //   @Column({ type: 'enum', enum: SeatType, nullable: false })
  //   seatType: SeatType;

  @Column({ type: 'int', nullable: false })
  price: number;

  //   @Column({ type: 'enum', enum: SeatStatus, nullable: false })
  //   status: SeatStatus;

  @Column({ type: 'varchar', nullable: false })
  seatNum: string;

  @Column({ type: 'int', nullable: false })
  concertId: number;

  @ManyToOne(() => Date, (date) => date.seat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  date: Date;
  @Column({ type: 'int' })
  dateId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
