import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PAYMENT_SERVICE',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3003 },
            },
        ]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentIntegrationModule { }