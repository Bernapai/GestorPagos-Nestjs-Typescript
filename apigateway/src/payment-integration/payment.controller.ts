import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from '../../../Microservices/payment-service/src/payment/dto/createPayment.dto';
import { UpdatePaymentDto } from '../../../Microservices/payment-service/src/payment/dto/updatePayment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ApiOperation({ summary: 'Crear pago' })
  @ApiResponse({ status: 201, description: 'Pago creado' })
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @ApiResponse({ status: 200, description: 'Lista de pagos' })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Obtener pago por ID' })
  @ApiResponse({ status: 200, description: 'Pago encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar pago' })
  @ApiResponse({ status: 200, description: 'Pago actualizado' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaymentDto) {
    return this.paymentService.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar pago' })
  @ApiResponse({ status: 200, description: 'Pago eliminado' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }
}
