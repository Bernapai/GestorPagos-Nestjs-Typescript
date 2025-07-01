import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment/payment.entity';
@Module({
  imports: [
    PaymentModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
