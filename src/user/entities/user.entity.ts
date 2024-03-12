import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../types/userRole.type';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, nullable: false, default: Role.User })
  role: Role;

  @Column({ type: 'int', nullable: false, default: 1000000 })
  point: number;

  @OneToMany(() => Reservation, (reservation) => reservation, { cascade: true })
  reservation: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
