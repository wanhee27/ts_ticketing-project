import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserInfo } from '../utils/userInfo.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.userService.register(userRegisterDto);
  }

  //로그인
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  //프로필 조회
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getUserInfo(@UserInfo() user: User) {
    return user;
  }
}
