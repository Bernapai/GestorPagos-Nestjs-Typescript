import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE', // Nombre para inyectar
        transport: Transport.TCP, // Puede ser también RabbitMQ, Kafka, etc.
        options: {
          host: 'localhost', // Dirección del microservicio de notificaciones
          port: 3002, // Puerto en que se levanta Notification
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
