import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './payment.entity';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPayment: Payment = {
    id: 1,
    method: 'paypal',
    amount: 150,
    currency: 'USD',
    userId: 'user1',
    status: 'pending',
    transactionId: '',
    paidAt: new Date('2025-06-01T10:00:00Z'),
    createdAt: new Date('2025-05-30T10:00:00Z'),
  };

  const mockPaymentsArray: Payment[] = [mockPayment];

  const mockPaymentService = {
    create: jest.fn().mockResolvedValue(mockPayment),
    findAll: jest.fn().mockResolvedValue(mockPaymentsArray),
    findOne: jest.fn().mockResolvedValue(mockPayment),
    update: jest.fn().mockResolvedValue(mockPayment),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto and return payment', async () => {
      const dto: CreatePaymentDto = {
        method: 'paypal',
        amount: 150,
        currency: 'USD',
        userId: 'user1',
        status: 'pending',
        transactionId: '',
        paidAt: '2025-06-01T10:00:00Z',
        phoneNumber: ''
      };

      const result = await controller.create(dto);

      expect(mockPaymentService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return array of payments', async () => {
      const result = await controller.findAll();

      expect(mockPaymentService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPaymentsArray);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id and return payment', async () => {
      const id = 1;
      const result = await controller.findOne(id);

      expect(mockPaymentService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto and return payment', async () => {
      const id = 1;
      const dto: UpdatePaymentDto = {
        status: 'completed',
        transactionId: 'tx123',
        paidAt: '2025-06-02T12:00:00Z',
      };

      const payload = { id, dto };

      const result = await controller.update(payload);

      expect(mockPaymentService.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('remove', () => {
    it('should call service.remove with id', async () => {
      const id = 1;

      await controller.remove(id);

      expect(mockPaymentService.remove).toHaveBeenCalledWith(id);
    });
  });
});
