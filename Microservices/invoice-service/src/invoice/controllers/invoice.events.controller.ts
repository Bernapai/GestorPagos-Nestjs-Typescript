// src/invoice/invoice.events.controller.ts

import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InvoiceService } from '../services/invoice.service';
import { invoiceDto } from '../dto/createInvoice.dto';

@Controller()
export class InvoiceEventsController {
  constructor(private readonly invoiceService: InvoiceService) { }
  // Escucha el evento 'create_invoice' enviado desde otro microservicio

  @EventPattern('create_invoice')
  async handleCreateInvoice(@Payload() data: invoiceDto) {
    await this.invoiceService.create(data);
  }
}
