// notification.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationEventsController } from 'src/notification/events/notification.events.controller';
import { NotificationService } from 'src/notification/services/notification.service';
import { SendSmsDto } from 'src/notification/dto/createNotification.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NotificationEventsController', () => {
  let controller: NotificationEventsController;
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
      controllers: [NotificationEventsController],
      providers: [
        {
          provide: NotificationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotificationEventsController>(NotificationEventsController);
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
      const errorMsg = 'Twilio down';
      (mockService.createAndSend as jest.Mock).mockRejectedValueOnce(new Error(errorMsg));

      try {
        await controller.sendSms(sendSmsDto);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(err.getResponse()).toEqual({
          status: 'error',
          message: errorMsg,
        });
      }
    });
  });
});
