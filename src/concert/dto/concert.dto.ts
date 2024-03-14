import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConcertDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 내용을 입력해주세요.' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: '공연 위치를 입력해주세요.' })
  location: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;
}
