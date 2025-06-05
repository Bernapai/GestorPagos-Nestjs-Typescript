import { Injectable, Inject } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @Inject('NOTIFICATION_SERVICE') // Inyectamos el client proxy
    private readonly notificationClient: ClientProxy,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    const savedPayment = await this.paymentRepository.save(payment);

    if (createPaymentDto.phoneNumber) {
      await lastValueFrom(
        this.notificationClient.emit('send_notification', {
          userId: createPaymentDto.userId,
          phoneNumber: createPaymentDto.phoneNumber, // nuevo campo
          message: `Pago realizado por ${createPaymentDto.amount} ${createPaymentDto.currency}`,
        }),
      );
    }

    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
