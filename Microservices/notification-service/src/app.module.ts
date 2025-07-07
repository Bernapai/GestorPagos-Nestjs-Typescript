import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification/entities/notificacion.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    NotificationModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
