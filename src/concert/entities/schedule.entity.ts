import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Concert } from './concert.entity';
import { Seat } from './seat.entity';
import { IsDateString, IsMilitaryTime, IsNotEmpty } from 'class-validator';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  concertId: number;

  /**
   * 공연 날짜
   * @example "2024-01-19"
   */
  @IsNotEmpty({ message: '공연 날짜를 입력해 주세요.' })
  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  /**
   * 공연 시간
   * @example "19:30"
   */
  @IsNotEmpty({ message: '공연 시간을 입력해 주세요.' })
  @IsMilitaryTime()
  @Column({ type: 'time' })
  time: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Concert, (concert) => concert.schedules, {
    onDelete: 'CASCADE',
  })
  concert: Concert;

  @OneToOne(() => Seat, (seat) => seat.schedule, { cascade: true })
  seat: Seat;
}
