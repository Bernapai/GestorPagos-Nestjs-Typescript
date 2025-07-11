import { Controller } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../schemas/invoice.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { invoiceDto } from '../dto/createInvoice.dto'; // Adjust the import path as necessary
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @MessagePattern({ cmd: 'create-invoice' })
  async create(@Payload() createInvoiceDto: invoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @MessagePattern({ cmd: 'get-invoices' })
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }
}
