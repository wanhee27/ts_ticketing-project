import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  /**
   * 회원가입
   * @param userRegisterDto
   * @returns
   */
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const data = await this.userService.register(userRegisterDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입 되었습니다.',
      data,
    };
  }

  //로그인
  /**
   * 로그인
   * @param req
   * @param loginDto
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    const data = this.userService.login(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }

  //프로필 조회
  /**
   * 내 정보 조회
   * @param req
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async findMe(@Request() req) {
    const userId = req.user.id;

    const data = await this.userService.findOneById(userId);

    return {
      statusCode: HttpStatus.OK,
      message: '내 정보 조회에 성공했습니다.',
      data,
    };
  }
}
