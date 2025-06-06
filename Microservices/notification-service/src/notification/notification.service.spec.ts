import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { Notification } from './notificacion.entity';
import { SendSmsDto } from './dto/createNotification.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Twilio } from 'twilio';
import { MessageListInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { create } from 'domain';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockRepo: Partial<Repository<Notification>>;
  let mockMessages: MessageListInstance;

  const mockNotification: Notification = {
    id: 1,
    to: '+1234567890',
    message: 'Test message',
    status: 'pending',
  };

  const sendSmsDto: SendSmsDto = {
    to: '+1234567890',
    message: 'Test message',
  };

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn().mockReturnValue(mockNotification),
      save: jest
        .fn()
        .mockResolvedValue({ ...mockNotification, status: 'sent' }),
    };

    mockMessages = {
      create: jest.fn().mockResolvedValue({ sid: 'SM123456' }),
    } as unknown as MessageListInstance;

    const mockTwilioClient: Twilio = {
      messages: mockMessages,
    } as unknown as Twilio;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockRepo,
        },
      ],
    })
      .overrideProvider(NotificationService)
      .useFactory({
        factory: () => {
          const service = new NotificationService(
            mockRepo as Repository<Notification>,
          );
          service['twilioClient'] = mockTwilioClient;
          return service;
        },
      })
      .compile();

    service = module.get<NotificationService>(NotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAndSend', () => {
    it('should send SMS and save as sent', async () => {
      const result = await service.createAndSend(sendSmsDto);

      expect(mockRepo.create).toHaveBeenCalledWith({
        to: sendSmsDto.to,
        message: sendSmsDto.message,
        status: 'pending',
      });

      expect(mockMessages.create).toHaveBeenCalledWith({ // Error en mockMessages.create
        body: sendSmsDto.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: sendSmsDto.to,
      });

      expect(result.status).toBe('sent');
    });

    it('should mark notification as failed on error', async () => {
      (mockMessages.create as jest.Mock).mockRejectedValueOnce(
        new Error('Twilio error'),
      );

      await expect(service.createAndSend(sendSmsDto)).rejects.toThrow(
        'Twilio error',
      );

      expect(mockRepo.save).toHaveBeenCalledTimes(2);
      expect(mockRepo.save).toHaveBeenNthCalledWith(2, {
        ...mockNotification,
        status: 'failed',
      });
    });
  });
});