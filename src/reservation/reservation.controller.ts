import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/types/userRole.type';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('예매 정보')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * 예매하기
   * @param createReservationDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Customer)
  @UseGuards(RolesGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const userId = req.user.id;
    const data = await this.reservationService.create(
      userId,
      createReservationDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: '예매에 성공했습니다.',
      data,
    };
  }

  /**
   * 예매 목록 조회
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    const data = await this.reservationService.findAll(userId);

    return {
      statusCode: HttpStatus.OK,
      message: '예매 목록 조회에 성공했습니다.',
      data,
    };
  }

  /**
   * 예매 상세 조회
   * @param id
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    const userId = req.user.id;
    return this.reservationService.findOne(id, userId);
  }
}
