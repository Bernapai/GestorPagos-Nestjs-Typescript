import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { getModelToken } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice.schema';
import { invoiceDto } from './dto/createInvoice.dto';

// Mocks
const mockInvoiceModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

describe('InvoiceService', () => {
  let service: InvoiceService;
  let model: typeof mockInvoiceModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockInvoiceModel,
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    model = module.get<typeof mockInvoiceModel>(getModelToken(Invoice.name));

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an invoice with PDF', async () => {
      const dto: invoiceDto = {
        method: 'PayPal',
        amount: 100,
        currency: 'USD',
        status: 'Paid',
        transactionId: 'txn123',
        userId: 'user456',
      };

      const savedInvoice = {
        ...dto,
        _id: 'invoiceId',
        pdfBase64: 'someBase64',
      };
      model.create.mockResolvedValue(savedInvoice);

      const result = await service.create(dto);

      expect(model.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('pdfBase64');
    });
  });

  describe('findAll', () => {
    it('should return all invoices', async () => {
      const invoices = [{ id: '1' }, { id: '2' }];
      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(invoices),
      });

      const result = await service.findAll();
      expect(result).toEqual(invoices);
    });
  });

  describe('findOne', () => {
    it('should return an invoice by id', async () => {
      const invoice = { id: '1', amount: 50 };
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(invoice),
      });

      const result = await service.findOne('1');
      expect(result).toEqual(invoice);
    });
  });
});
