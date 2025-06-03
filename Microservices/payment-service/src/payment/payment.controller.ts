import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './payment.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern({ cmd: 'create-payment' })
  async create(
    @Payload() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @MessagePattern({ cmd: 'get-payments' })
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @MessagePattern({ cmd: 'get-payment' })
  async findOne(@Payload() id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-payment' })
  async update(
    @Payload() payload: { id: number; dto: UpdatePaymentDto },
  ): Promise<Payment> {
    return this.paymentService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: 'delete-payment' })
  async remove(@Payload() id: number): Promise<void> {
    return this.paymentService.remove(id);
  }
}
