import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ConcertCategory } from '../types/concert-category.type';

export class FindAllConcertDto {
  /**
   * 검색 키워드
   * @example "임영웅"
   */
  @IsOptional()
  @IsString()
  keyword?: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsOptional()
  @IsEnum(ConcertCategory)
  category?: ConcertCategory;
}
