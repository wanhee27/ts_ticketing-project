import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
/* 예시
{
    "title": "공연이름",
    "content": "공연내용",
    "date": "2023-01-02",
    "time": "12:00",
    "location": "장소",
    "seat": [
      {"count": 20, "price": 150000 }
    ]
  } 
  */
class SeatInfo {
  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요' })
  count: number;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요' })
  price: number;
}

class CreateSeatDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요' })
  content: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요' })
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요' })
  time: string;

  @IsString()
  @IsNotEmpty({ message: '공연장소를 입력해주세요' })
  place: string;

  @ValidateNested({ each: true })
  seat: SeatInfo[];
}

export default CreateSeatDto;
