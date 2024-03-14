import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { Seat } from '../seat/entities/seat.entity';
import { User } from '../user/entities/user.entity';
import { Concert } from '../concert/entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Seat, User, Concert])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
