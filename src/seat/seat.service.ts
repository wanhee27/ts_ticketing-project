import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatService {
  findAll() {
    return `This action returns all seat`;
  }

  findOne(seatId: number) {
    return `This action returns a #${seatId} seat`;
  }

  remove(seatId: number) {
    return `This action removes a #${seatId} seat`;
  }
}
