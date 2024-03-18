import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/concert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Like, Repository } from 'typeorm';
import { FindAllConcertDto } from './dto/find-concert.dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async create(createConcertDto: CreateConcertDto) {
    const { schedules, seats, ...restOfConcert } = createConcertDto;

    const existedConcert = await this.concertRepository.findOneBy({
      title: createConcertDto.title,
    });

    if (existedConcert) {
      throw new BadRequestException('이미 사용 중인 공연명입니다.');
    }

    const concert = await this.concertRepository.save({
      ...restOfConcert,
      schedules: schedules.map((schedule) => ({
        ...schedule,
        seat: {
          availableSeats: seats,
          totalSeats: seats,
        },
      })),
    });

    return concert;
  }

  async findAll({ keyword, category }: FindAllConcertDto) {
    const concerts = await this.concertRepository.find({
      where: {
        ...(keyword && { title: Like(`%${keyword}%`) }),
        ...(category && { category }),
      },
    });

    return concerts;
  }

  async findOne(id: number) {
    const concert = await this.concertRepository.findOne({
      where: { id },
      relations: {
        schedules: {
          seat: true,
        },
      },
    });

    if (!concert) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    return concert;
  }
}
