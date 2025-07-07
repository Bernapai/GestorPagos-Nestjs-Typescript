import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './controller/payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database/database.module'; // Asegúrate de que este módulo exista

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
    ClientsModule.register([
      {
        name: 'INVOICE_SERVICE', // Nombre para inyectar
        transport: Transport.TCP, // Puede ser también RabbitMQ, Kafka, etc.
        options: {
          host: 'localhost', // Dirección del microservicio de notificaciones
          port: 3001, // Puerto en que se levanta Notification
        },
      },
    ]),
    DatabaseModule, // Asegúrate de que este módulo exista y esté configurado correctamente
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
