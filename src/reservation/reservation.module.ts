import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/concert/entities/schedule.entity';
import { Seat } from 'src/concert/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Schedule, Seat])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
