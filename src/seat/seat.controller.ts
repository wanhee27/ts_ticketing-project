import { Controller, Get, Param, Delete } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  //모든 좌석 조회
  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  //좌석 선택
  @Get(':seatId')
  findOne(@Param('seatId') seatId: string) {
    return this.seatService.findOne(+seatId);
  }

  //지정된 좌석
  @Delete(':seatId')
  remove(@Param('seatId') seatId: string) {
    return this.seatService.remove(+seatId);
  }
}
