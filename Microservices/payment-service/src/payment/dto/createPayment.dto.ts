import { IsString, IsNumber } from 'class-validator';
import { IsOptional, IsDateString } from 'class-validator';
export class CreatePaymentDto {
  @IsString()
  method: string; // ej. 'paypal', 'tarjeta', 'simulado'

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  userId: string;

  @IsString()
  status?: string; // opcional, ej. 'pending', 'success', 'failed'

  @IsOptional()
  @IsString()
  transactionId?: string; // id de la transacción externa (PayPal, etc)

  @IsOptional()
  @IsDateString()
  paidAt?: string; // fecha pago

  @IsString()
  phoneNumber: string; // nuevo campo //
}
