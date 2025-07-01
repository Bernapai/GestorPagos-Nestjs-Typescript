// api-gateway/src/invoices/invoice.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { invoiceDto } from '../../../Microservices/invoice-service/src/invoice/dto/createInvoice.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body() data: invoiceDto) {
    return this.invoiceService.createInvoice(data);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }
}
