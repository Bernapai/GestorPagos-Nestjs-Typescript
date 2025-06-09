// src/invoice/schemas/invoice.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  userId: string;

  // Podés agregar más campos si querés, como la ruta al PDF generado:
  @Prop()
  pdfUrl?: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
