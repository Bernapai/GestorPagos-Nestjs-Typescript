// src/invoice/invoice.events.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceEventsController } from 'src/invoice/controllers/invoice.events.controller';
import { InvoiceService } from 'src/invoice/services/invoice.service';
import { invoiceDto } from '../../src/invoice/dto/createInvoice.dto';

describe('InvoiceEventsController', () => {
  let controller: InvoiceEventsController;

  const mockInvoiceService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceEventsController],
      providers: [
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
      ],
    }).compile();

    controller = module.get<InvoiceEventsController>(InvoiceEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call invoiceService.create() with the event payload', async () => {
    const payload: invoiceDto = {
      method: 'paypal',
      amount: 100,
      currency: 'USD',
      status: 'completed',
      transactionId: 'txn123',
      userId: 'user1',
    };

    await controller.handleCreateInvoice(payload);

    expect(mockInvoiceService.create).toHaveBeenCalledWith(payload);
  });
});
