// create-invoice.dto.ts
import { IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  readonly userId: string;

  @IsUUID()
  readonly paymentId: string;

  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly currency: string;

  @IsDateString()
  readonly date: string; // o podés usar Date si preferís
}
