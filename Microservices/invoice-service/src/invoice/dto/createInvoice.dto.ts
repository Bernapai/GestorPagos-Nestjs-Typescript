// src/invoice/dto/payment.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class invoiceDto {
  @IsString()
  @IsNotEmpty()
  method: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
