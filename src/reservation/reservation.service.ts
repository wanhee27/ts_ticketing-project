import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '../seat/entities/seat.entity';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Concert } from '../concert/entities/concert.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  //예매 확인
  async getReservation(user: User) {
    const userReservations = await this.reservationRepository.find({
      relations: ['concert'],
      where: { userId: user.userId },
    });
    userReservations.sort(
      (a, b) => b.concert.date.getTime() - a.concert.date.getTime(),
    );
    return userReservations;
  }

  //예매
  async newReservation(concertId: number, user: User, numOfSeats: number) {
    const concertInfo = await this.concertRepository.findOne({
      where: { concertId },
    });
    if (!concertInfo) {
      throw new NotFoundException('해당 공연이 존재하지 않습니다.');
    }
    // 예약에 필요한 포인트 계산
    const requiredPoints = concertInfo.price * numOfSeats;

    // 사용자의 포인트 확인
    if (user.point < requiredPoints) {
      throw new ConflictException('포인트가 부족합니다.');
    }

    // 예약 생성
    const reservation = this.reservationRepository.create({
      user,
      concert: concertInfo,
      numOfSeats,
    });
    await this.reservationRepository.save(reservation);

    // 사용자의 포인트 갱신
    user.point -= requiredPoints;
    await this.userRepository.save(user);

    // 예약 확인 및 결과 반환
    return {
      message: '예약이 완료되었습니다.',
      reservation,
    };
  }
}
