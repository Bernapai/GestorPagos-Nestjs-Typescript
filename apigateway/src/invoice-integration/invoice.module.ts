import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'INVOICE_SERVICE',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3001 },
            },
        ]),
    ],
    controllers: [InvoiceController],
    providers: [InvoiceService],
    exports: [InvoiceService],
})
export class InvoiceIntegrationModule { }