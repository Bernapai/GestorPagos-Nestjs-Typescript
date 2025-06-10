import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './schemas/invoice.schema';
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Invoice | null> {
    return this.invoiceService.findOne(id);
  }
}
