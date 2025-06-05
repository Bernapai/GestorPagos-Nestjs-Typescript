import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Twilio } from 'twilio';
import { Notification } from './notificacion.entity';
import { SendSmsDto } from './dto/createNotification.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async createAndSend(sendSmsDto: SendSmsDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      to: sendSmsDto.to,
      message: sendSmsDto.message,
      status: 'pending',
    });
    const savedNotification =
      await this.notificationRepository.save(notification);

    try {
      await this.twilioClient.messages.create({
        body: sendSmsDto.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: sendSmsDto.to,
      });

      this.logger.log(`SMS enviado a ${sendSmsDto.to}`);

      savedNotification.status = 'sent';
      await this.notificationRepository.save(savedNotification);

      return savedNotification;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error enviando SMS a ${sendSmsDto.to}: ${error.message}`,
        );
      } else {
        this.logger.error(
          `Error enviando SMS a ${sendSmsDto.to}: ${String(error)}`,
        );
      }

      savedNotification.status = 'failed';
      await this.notificationRepository.save(savedNotification);

      throw error;
    }
  }
}
