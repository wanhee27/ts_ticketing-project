import { PickType } from '@nestjs/swagger';
import { Concert } from '../entities/concert.entity';
import { CreateScheduleDto } from './schedule.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConcertDto extends PickType(Concert, [
  'title',
  'content',
  'category',
  'location',
  'price',
  'thumbnail',
]) {
  @ValidateNested()
  @Type(() => CreateScheduleDto)
  schedules: CreateScheduleDto[];

  /**
   * 좌석 수
   * @example 100
   */
  @IsNotEmpty({ message: '좌석 수를 입력해 주세요.' })
  @IsNumber()
  seats: number;
}
