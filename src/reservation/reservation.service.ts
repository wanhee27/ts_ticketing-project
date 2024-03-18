import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Seat } from '../concert/entities/seat.entity';
import { Schedule } from '../concert/entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(userId: number, { scheduleId }: CreateReservationDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 공연 회차정보 조회
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: scheduleId },
        relations: {
          concert: true,
        },
      });

      if (!schedule) {
        throw new NotFoundException('공연 회차 정보가 없습니다.');
      }

      // 예매 내역 생성
      const reservation = await queryRunner.manager.save(Reservation, {
        userId,
        scheduleId,
      });

      // 포인트 차감 -> concert 가격 정보
      const price = schedule.concert.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });

      const afterPaidPoints = user.point - price;
      if (afterPaidPoints < 0) {
        throw new BadRequestException('포인트가 부족합니다.');
      }
      user.point = afterPaidPoints;
      await queryRunner.manager.save(User, user);

      // 좌석 개수 줄이기
      const seat = await queryRunner.manager.findOneBy(Seat, { scheduleId });
      const afterReservationSeats = seat.availableSeats - 1;
      if (afterReservationSeats < 0) {
        throw new BadRequestException('예매 가능한 좌석이 없습니다.');
      }
      seat.availableSeats = afterReservationSeats;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return reservation;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.error(err);
      throw err;
    }
  }

  async findAll(userId: number) {
    const reservations = await this.reservationRepository.find({
      where: { userId },
      relations: {
        schedule: {
          concert: true,
        },
      },
    });

    return reservations;
  }

  async findOne(id: number, userId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id, userId },
      relations: {
        schedule: {
          concert: true,
        },
      },
    });

    if (!reservation) {
      throw new NotFoundException('예매 정보를 찾을 수 없습니다.');
    }

    return reservation;
  }
}
