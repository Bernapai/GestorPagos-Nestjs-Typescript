// notification.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SendSmsDto } from './dto/createNotification.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NotificationController', () => {
  let controller: NotificationController;
  let mockService: Partial<Record<keyof NotificationService, jest.Mock>>;

  const sendSmsDto: SendSmsDto = {
    to: '+1234567890',
    message: 'Hello World',
  };

  const mockNotification = {
    id: 1,
    to: sendSmsDto.to,
    message: sendSmsDto.message,
    status: 'sent',
  };

  beforeEach(async () => {
    mockService = {
      createAndSend: jest.fn().mockResolvedValue(mockNotification),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendSms', () => {
    it('debería devolver status success y los datos de la notificación', async () => {
      const response = await controller.sendSms(sendSmsDto);

      expect(mockService.createAndSend).toHaveBeenCalledWith(sendSmsDto);
      expect(response).toEqual({
        status: 'success',
        data: mockNotification,
      });
    });

    it('debería lanzar HttpException con status 500 cuando el servicio falla', async () => {
      (mockService.createAndSend as jest.Mock).mockRejectedValueOnce(
        new Error('Twilio down'),
      );

      await expect(controller.sendSms(sendSmsDto)).rejects.toBeInstanceOf(
        HttpException,
      );

      try {
        await controller.sendSms(sendSmsDto);
      } catch (err) {
        const exc = err as HttpException;
        expect(exc.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(exc.getResponse()).toEqual({
          status: 'error',
          message: 'Twilio down',
        });
      }
    });
  });
});
