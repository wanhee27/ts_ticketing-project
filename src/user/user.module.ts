import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { LocalStrategy } from 'src/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '12h' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Reservation]),
    PassportModule,
    AuthModule,
  ],
  providers: [UserService, LocalStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
