import { BadRequestException, Injectable } from '@nestjs/common';
import { ConcertDto } from './dto/concert.dto';
import { Concert } from './entities/concert.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/seat/entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import _ from 'lodash';
import { parse } from 'papaparse';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  //공연 목록 조회
  async concertList() {
    return this.concertRepository.find();
  }

  //공연 상세조회
  async concertDetail(concertId: number) {
    if (_.isNaN(concertId)) {
      throw new BadRequestException('공연Id가 잘못되었습니다.');
    }
    const concert = await this.concertRepository.findOne({
      where: { concertId: concertId },
    });
    if (!concert) {
      throw new BadRequestException('존재하지 않는 공연입니다.');
    }
    return { concert };
  }

  //공연 조회
  async concertSearch(searchWord: string) {
    const concertSearchResult = await this.concertRepository.find({
      where: {
        title: Like(`%${searchWord}%`),
      },
    });
    return concertSearchResult;
  }

  //공연 등록
  async create(concertDto: ConcertDto /* , file: Express.Multer.File */) {
    /*   if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('CSV 파일만 업로드 가능합니다.');
    }

    const csvContent = file.buffer.toString();

    let parseResult;
    try {
      parseResult = parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {
      throw new BadRequestException('CSV 파싱에 실패했습니다.');
    }

    const concertsData = parseResult.data as any[];

    for (const concertData of concertsData) {
      if (_.isNil(concertData.title) || _.isNil(concertData.content)) {
        throw new BadRequestException(
          'CSV 파일은 name과 description 컬럼을 포함해야 합니다.',
        );
      }
    } */

    const concertInfo = await this.concertRepository.save({
      title: concertDto.title,
      content: concertDto.content,
      location: concertDto.location,
      date: concertDto.date,
      price: concertDto.price,
    });
    return { message: '공연이 등록되었습니다.' };
  }

  //공연 수정

  //공연 삭제
}
