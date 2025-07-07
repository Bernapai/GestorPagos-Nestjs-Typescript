import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../../src/payment/controller/payment.controller';
import { PaymentService } from 'src/payment/services/payment.service';
import { CreatePaymentDto } from '../../src/payment/dto/createPayment.dto';
import { UpdatePaymentDto } from '../../src/payment/dto/updatePayment.dto';
import { Payment } from '../../src/payment/entities/payment.entity';

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

    it('should throw error if service.create fails', async () => {
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

      mockPaymentService.create.mockRejectedValueOnce(new Error('Service error'));

      await expect(controller.create(dto)).rejects.toThrow('Service error');
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return array of payments', async () => {
      const result = await controller.findAll();

      expect(mockPaymentService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPaymentsArray);
    });

    it('should throw error if service.findAll fails', async () => {
      mockPaymentService.findAll.mockRejectedValueOnce(new Error('DB error'));

      await expect(controller.findAll()).rejects.toThrow('DB error');
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id and return payment', async () => {
      const id = 1;
      const result = await controller.findOne(id);

      expect(mockPaymentService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPayment);
    });

    it('should throw error if service.findOne fails', async () => {
      mockPaymentService.findOne.mockRejectedValueOnce(new Error('Not found'));

      await expect(controller.findOne(1)).rejects.toThrow('Not found');
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

    it('should throw error if service.update fails', async () => {
      const dto: UpdatePaymentDto = {
        status: 'completed',
        transactionId: 'tx123',
        paidAt: '2025-06-02T12:00:00Z',
      };

      mockPaymentService.update.mockRejectedValueOnce(new Error('Update failed'));

      await expect(controller.update({ id: 1, dto })).rejects.toThrow('Update failed');
    });
  });

  describe('remove', () => {
    it('should call service.remove with id', async () => {
      const id = 1;

      await controller.remove(id);

      expect(mockPaymentService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw error if service.remove fails', async () => {
      mockPaymentService.remove.mockRejectedValueOnce(new Error('Remove failed'));

      await expect(controller.remove(1)).rejects.toThrow('Remove failed');
    });
  });
})
