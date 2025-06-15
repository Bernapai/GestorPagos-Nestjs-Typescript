// api-gateway/src/payment.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from '../../../Microservices/payment-service/src/payment/dto/createPayment.dto';
import { UpdatePaymentDto } from '../../../Microservices/payment-service/src/payment/dto/updatePayment.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<CreatePaymentDto> {
    return firstValueFrom(
      this.paymentClient.send<CreatePaymentDto, CreatePaymentDto>(
        { cmd: 'create-payment' },
        createPaymentDto,
      ),
    );
  }

  async findAll(): Promise<CreatePaymentDto[]> {
    return await firstValueFrom(
      this.paymentClient.send<CreatePaymentDto[]>({ cmd: 'get-payments' }, {}),
    );
  }

  async findOne(id: number): Promise<CreatePaymentDto> {
    return firstValueFrom(
      this.paymentClient.send<CreatePaymentDto>(
        { cmd: 'get-payment-by-id' },
        id,
      ),
    );
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<UpdatePaymentDto> {
    return firstValueFrom(
      this.paymentClient.send(
        { cmd: 'update-payment' },
        { id, ...updatePaymentDto },
      ),
    );
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    return firstValueFrom(
      this.paymentClient.send<{ deleted: boolean }, number>(
        { cmd: 'delete-payment' },
        id,
      ),
    );
  }
}
