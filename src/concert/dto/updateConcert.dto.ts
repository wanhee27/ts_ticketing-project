import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateConcertDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;
}
