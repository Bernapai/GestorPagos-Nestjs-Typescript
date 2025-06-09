// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/invoice_service'),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule { }
