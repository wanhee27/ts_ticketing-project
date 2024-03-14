import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../utils/userInfo.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  //예매 확인
  @Get()
  async myReservation(@UserInfo() user: User) {
    return await this.reservationService.getReservation(user);
  }

  //좌석을 지정하지 않고 예매
  @Post(':concertId')
  async newReservation(
    @UserInfo() user: User,
    @Param('concertId') concertId: number,
    @Body('numOfSeats') numOfSeats: number,
  ) {
    return await this.reservationService.newReservation(
      concertId,
      user,
      numOfSeats,
    );
  }
  //좌석을 지정하고 예매

  //예매 취소
}
