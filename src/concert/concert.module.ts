import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { Schedule } from '../schedule/entities/schedule.entity';
import { Seat } from '../seat/entities/seat.entity';
// import { ScheduleModule } from '../schedule/schedule.module';
import { SeatModule } from '../seat/seat.module';
import { Reservation } from '../reservation/entities/reservation.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Concert, Seat, Reservation]),

    SeatModule,
  ],
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}
