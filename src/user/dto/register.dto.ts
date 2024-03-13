import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';

export class UserRegisterDto {
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @IsString()
  password: string;

  role: Role = Role.User;
}
