import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({ unsigned: true }) //autoincrement 해주는속성
  id: number;

  /**
   * 이름
   * @example "고객"
   */
  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  @IsString()
  @Column()
  name: string;

  /**
   * 이메일
   * @example "example@example.com"
   */
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' })
  @Column({ unique: true })
  email: string;

  /**
   * 비밀번호
   * @example "Ex@mp1e!!"
   */
  @IsNotEmpty({ message: '비밀번호을 입력해 주세요.' })
  @IsStrongPassword(
    {},
    {
      message:
        '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해서 8자리 이상으로 입력해야 합니다.',
    },
  )
  @Column({ select: false })
  password: string;

  @IsBoolean()
  @Column({ default: false })
  isAdmin: boolean;

  @IsNumber()
  @Column({ unsigned: true })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation[];
}
