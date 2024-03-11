import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../types/userRole.type';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export class User {}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, nullable: false })
  role: Role;

  @Column({ type: 'int', nullable: false, default: 1000000 })
  point: Date;

  @OneToMany(() => Reservation, (reservation) => reservation, { cascade: true })
  ticket: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
