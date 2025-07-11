import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from 'src/invoice/controllers/invoice.controller';
import { InvoiceService } from 'src/invoice/services/invoice.service';
import { invoiceDto } from '../../src/invoice/dto/createInvoice.dto';
import { Invoice } from '../../src/invoice/schemas/invoice.schema';

describe('InvoiceController', () => {
  let controller: InvoiceController;


  const mockInvoiceService: jest.Mocked<Partial<InvoiceService>> = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mock calls
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call invoiceService.create() with the DTO and return the result', async () => {
    const dto: invoiceDto = {
      method: 'paypal',
      amount: 100,
      currency: 'USD',
      status: 'completed',
      transactionId: 'txn123',
      userId: 'user1',
    };

    const createdInvoice = { _id: '1', ...dto };
    (mockInvoiceService.create as jest.Mock).mockResolvedValue(createdInvoice);

    const result = await controller.create(dto);

    expect(mockInvoiceService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdInvoice);
  });

  it('should return all invoices from invoiceService.findAll()', async () => {
    const invoices: Partial<Invoice>[] = [
      {
        _id: '1',
        method: 'paypal',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        transactionId: 'txn123',
        userId: 'user1',
      },
      {
        _id: '2',
        method: 'stripe',
        amount: 200,
        currency: 'EUR',
        status: 'pending',
        transactionId: 'txn456',
        userId: 'user2',
      },
    ];

    (mockInvoiceService.findAll as jest.Mock).mockResolvedValue(invoices);

    const result = await controller.findAll();

    expect(mockInvoiceService.findAll).toHaveBeenCalled();
    expect(result).toEqual(invoices);
  });
});
