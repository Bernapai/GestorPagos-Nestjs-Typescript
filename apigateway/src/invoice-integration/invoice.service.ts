import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { invoiceDto } from '../../../Microservices/invoice-service/src/invoice/dto/createInvoice.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_SERVICE') private readonly client: ClientProxy,
  ) { }

  async createInvoice(data: invoiceDto): Promise<any> {
    return firstValueFrom(this.client.send({ cmd: 'create-invoice' }, data));
  }

  async findAll(): Promise<invoiceDto[]> {
    return firstValueFrom(
      this.client.send<invoiceDto[]>({ cmd: 'get-invoices' }, {}),
    );
  }

  async findOne(id: string): Promise<invoiceDto> {
    return firstValueFrom(
      this.client.send<invoiceDto>({ cmd: 'get-invoice' }, { id }),
    );
  }
}
