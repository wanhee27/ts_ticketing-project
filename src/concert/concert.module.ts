import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Schedule } from './entities/schedule.entity';
import { Seat } from './entities/seat.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Schedule, Seat]), AuthModule],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
