import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { Seat } from './entities/seat.entity';
import { Concert } from '../concert/entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Concert])],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
