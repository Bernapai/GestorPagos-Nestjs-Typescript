import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendSmsDto } from './dto/createNotification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('sms')
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    try {
      const notification =
        await this.notificationService.createAndSend(sendSmsDto);
      return {
        status: 'success',
        data: notification,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error instanceof Error ? error.message : 'Error sending SMS',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
