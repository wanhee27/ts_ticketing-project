import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../user/dto/register.dto';
import { User } from '../user/entities/user.entity';
import { LoginDto } from '../user/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //회원가입
  async register(dto: UserRegisterDto) {
    const existingUser = await this.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const hashedPassword = await hash(dto.password, 10);

    await this.userRepository.save({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      role: dto.role,
    });
    return { message: '가입 성공' };
  }

  //로그인
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      select: ['userId', 'email', 'password'],
      where: { email: dto.email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email: dto.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //프로필조회
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
