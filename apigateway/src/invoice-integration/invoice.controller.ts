// api-gateway/src/invoices/invoice.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { invoiceDto } from '../../../Microservices/invoice-service/src/invoice/dto/createInvoice.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @ApiOperation({ summary: 'Crear factura' })
  @ApiResponse({ status: 201, description: 'Factura creada' })
  @Post()
  create(@Body() data: invoiceDto) {
    return this.invoiceService.createInvoice(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({ status: 200, description: 'Lista de facturas' })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }
}
