import { Reservation } from '../../reservation/entities/reservation.entity';
import { Date } from '../../date/entities/date.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'content',
})
export class Concert {
  @PrimaryGeneratedColumn()
  concertId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.concert)
  reservation: Reservation[];

  @OneToMany(() => Date, (date) => date.concert, {
    cascade: true,
    eager: true,
  })
  date: Date[];
}
