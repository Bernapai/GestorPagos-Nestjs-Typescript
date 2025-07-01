import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice/schemas/invoice.schema';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    InvoiceModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forFeature([Invoice])
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
