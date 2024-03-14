import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Patch,
  Post,
  Query,
  // UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertDto } from './dto/concert.dto';
// import { UpdateConcertDto } from './dto/updateConcert.dto';
import { Role } from 'src/user/types/userRole.type';
import { Roles } from 'src/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  //공연 목록 조회
  @Get()
  concertList() {
    return this.concertService.concertList();
  }
  //공연 상세조회
  @Get(':concertId')
  concertDetail(@Param('concertId') concertId: number) {
    return this.concertService.concertDetail(concertId);
  }
  //공연 조회
  @Get('search')
  concertSearch(@Query('searchWord') searchWord: string) {
    return this.concertService.concertSearch(searchWord);
  }

  //공연 등록
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() concertDto: ConcertDto,
    /* @UploadedFile() file: Express.Multer.File, */
  ) {
    return this.concertService.create(concertDto /* file */);
  }

  // //공연 수정
  // @Roles(Role.Admin)
  // @Patch(':concertId')
  // update(
  //   @Param('concertId') concertId: number,
  //   @Body() updateConcertDto: UpdateConcertDto,
  // ) {
  //   return this.concertService.update(+concertId, updateConcertDto);
  // }
  // //공연 삭제
  // @Roles(Role.Admin)
  // @Delete(':concertId')
  // remove(@Param('concertId') concertId: number) {
  //   return this.concertService.remove(+concertId);
  // }
}
