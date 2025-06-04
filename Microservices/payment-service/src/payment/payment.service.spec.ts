import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';

describe('PaymentService', () => {
  let service: PaymentService;

  const mockPayment: Payment = {
    id: 1,
    method: 'credit_card',
    amount: 100.5,
    currency: 'USD',
    userId: 'user123',
    status: 'pending',
    transactionId: '',
    paidAt: new Date('2025-06-01T10:00:00Z'), // Aquí sí Date
    createdAt: new Date('2025-05-30T10:00:00Z'),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto: CreatePaymentDto) => dto),
    save: jest.fn().mockResolvedValue(mockPayment),
    find: jest.fn().mockResolvedValue([mockPayment]),
    findOneBy: jest.fn(),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a payment', async () => {
      const dto: CreatePaymentDto = {
        method: 'credit_card',
        amount: 100.5,
        currency: 'USD',
        userId: 'user123',
        status: 'pending',
        transactionId: '',
        paidAt: '',
      };
      mockRepository.create.mockReturnValue(dto);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('findOne', () => {
    it('should return a payment if found', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockPayment);
      const result = await service.findOne(1);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockPayment);
    });

    it('should throw error if payment not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(
        'Payment with id 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated payment', async () => {
      const updateDto: UpdatePaymentDto = {
        status: 'completed',
        transactionId: 'tx123',
        paidAt: '',
      };
      mockRepository.findOneBy.mockResolvedValue({
        ...mockPayment,
        ...updateDto,
      });

      const result = await service.update(1, updateDto);

      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ ...mockPayment, ...updateDto });
    });
  });

  describe('remove', () => {
    it('should delete the payment', async () => {
      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
