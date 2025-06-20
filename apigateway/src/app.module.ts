import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoiceController } from './invoice-integration/invoice.controller';
import { InvoiceService } from './invoice-integration/invoice.service';
import { PaymentController } from './payment-integration/payment.controller';
import { PaymentService } from './payment-integration/payment.service';
import { UsersController } from './user-integration/user.controller';
import { UsersService } from './user-integration/user.service';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVOICE_SERVICE',
        transport: Transport.TCP, // O cualquier tipo de transporte
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3004 },
      },
    ]),

    AuthModule,
  ],
  controllers: [UsersController, InvoiceController, PaymentController],
  providers: [UsersService, InvoiceService, PaymentService],
})
export class AppModule { }
