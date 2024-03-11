import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConcertModule } from './concert/concert.module';
import { SeatModule } from './seat/seat.module';
import { DateModule } from './date/date.module';
import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    AuthModule,
    ConcertModule,
    SeatModule,
    DateModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}