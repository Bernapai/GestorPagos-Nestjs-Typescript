import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../../Microservices/user-service/src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../../../Microservices/user-service/src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Juanber123()',
      database: 'users_pagos',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      secret: 'JksIJ093jJSo',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
