import { Concert } from '../../concert/entities/concert.entity';
import { Seat } from '../../seat/entities/seat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({
  name: 'date',
})
export class Date {
  @PrimaryGeneratedColumn()
  dateId: number;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @ManyToOne(() => Concert, (concert) => concert.date, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  concert: Concert;
  @Column({ type: 'int' })
  concertId: number;

  @OneToMany(() => Seat, (seat) => seat.date, { cascade: true })
  seat: Seat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
