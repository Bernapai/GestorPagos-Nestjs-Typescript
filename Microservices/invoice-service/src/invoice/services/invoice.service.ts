import { Injectable } from '@nestjs/common';
import { Invoice } from '../schemas/invoice.schema';
import { invoiceDto } from '../dto/createInvoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) { }

  async create(createInvoiceDto: invoiceDto): Promise<Invoice> {
    // 1. Generar PDF con pdf-lib
    const pdfBytes = await this.generatePdf(createInvoiceDto);

    // 2. Codificar PDF a base64 para guardar en Mongo
    const pdfBase64 = pdfBytes.toString('base64');

    // 3. Crear registro en Mongo con pdfBase64 incluido
    const createdInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      pdfBase64,
    });
    return createdInvoice.save();
  }

  private async generatePdf(data: invoiceDto): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 18;

    page.drawText('Invoice Details', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font,
      color: rgb(0, 0.53, 0.71),
    });

    const fields = [
      `Method: ${data.method}`,
      `Amount: ${data.amount} ${data.currency}`,
      `Status: ${data.status}`,
      `Transaction ID: ${data.transactionId}`,
      `User ID: ${data.userId}`,
    ];

    let yPosition = height - 6 * fontSize;
    fields.forEach((text) => {
      page.drawText(text, {
        x: 50,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }

  async findOne(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id).exec();
  }
}
