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
  //   if (concertInfo.date.getTime() - toDay.getTime() > 3 * 60 * 60 * 1000) {
  //     return { message: '해당 예약은 공연시간 3시간 전에만 가능합니다. ' };
  //   }
  //   const result = await this.seatRepository
  //     .createQueryBuilder('s')
  //     .select('s.seatId')
  //     .leftJoin(
  //       'reservation',
  //       'r',
  //       's.seatId = r.seatId AND r.concertId = :concertId',
  //       { concertId },
  //     )
  //     .where('r.reservation_Id IS NULL')
  //     .limit(1)
  //     .getRawOne();

  //   return result
  //     ? await this.selectSeat(concertId, result.seatId, user, 30000)
  //     : { message: '남아있는 좌석이 존재하지 않습니다.' };
  // }

  // async selectSeat(
  //   concertId: number,
  //   seatId: number,
  //   user: User,
  //   price: number = 30000,
  // ) {
  //   const concertInfo = await this.concertRepository.findOneBy({ concertId });
  //   if (concertInfo.date <= toDay) {
  //     return { message: '이미 지난 공연입니다.' };
  //   }
  //   const isSeat = await this.reservationRepository.findOneBy({
  //     concertId: concertId,
  //     seatId: seatId,
  //   });
  //   price = price
  //     ? price
  //     : (await this.seatRepository.findOneBy({ seatId })).price;

  //   if (isSeat) {
  //     return { message: '좌석이 매진되었습니다.' };
  //   } else if (user.point < price) {
  //     return { message: '소지금이 부족합니다.' };
  //   }

  //   await this.reservationRepository.save({
  //     concertId,
  //     seatId,
  //     userId: user.userId,
  //     price: price,
  //   });

  //   await this.userRepository.update(user.userId, {
  //     point: user.point - price,
  //   });

  //   return {
  //     message: '좌석 예약에 성공하였습니다',
  //     data: { concertInfo: concertInfo, price: price, seatNumber: seatId },
  //   };
  // }
}
