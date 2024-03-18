import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../user/dto/register.dto';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DEFAULT_CUSTOMER_POINT } from '../utils/point.constant';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  //회원가입
  async register({ email, password, passwordConfirm, name }: UserRegisterDto) {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      );
    }
    const hashRound = this.configService.get<number>('PASSWORD_HASH_ROUNDS');
    const hashedPassword = bcrypt.hashSync(password, hashRound);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      point: DEFAULT_CUSTOMER_POINT,
    });
    return this.login(user.id);
  }

  // //로그인
  login(userId: number) {
    const payload = { id: userId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true },
    });
    const isPasswordMatched = bcrypt.compareSync(
      password,
      user?.password ?? '',
    );
    if (!user || !isPasswordMatched) {
      return null;
    }
    return { id: user.id };
  }

  //프로필조회
  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }
}
