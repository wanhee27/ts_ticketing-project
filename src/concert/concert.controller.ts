import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/concert.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllConcertDto } from './dto/find-concert.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/types/userRole.type';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('공연 정보')
@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  /**
   * 공연 생성
   * @param createConcertDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createConcertDto: CreateConcertDto) {
    const data = await this.concertService.create(createConcertDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성에 성공했습니다.',
      data,
    };
  }

  /**
   * 공연 목록 조회 (검색)
   * @returns
   */
  @Get()
  async findAll(@Query() findAllConcertDto: FindAllConcertDto) {
    const data = await this.concertService.findAll(findAllConcertDto);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회에 성공했습니다.',
      data,
    };
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.concertService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 상세 조회에 성공했습니다.',
      data,
    };
  }
}
