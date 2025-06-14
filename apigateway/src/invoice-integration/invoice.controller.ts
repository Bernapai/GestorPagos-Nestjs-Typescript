// api-gateway/src/invoices/invoice.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { invoiceDto } from '../../../Microservices/invoice-service/src/invoice/dto/createInvoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body() data: invoiceDto) {
    return this.invoiceService.createInvoice(data);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }
}
