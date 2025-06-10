import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { SendSmsDto } from './dto/createNotification.dto';

@Controller()
export class NotificationEventsController {
  constructor(private readonly notificationService: NotificationService) { }

  // Escucha el evento 'send_notification' enviado desde otro microservicio
  @EventPattern('send_notification')
  async handleSendNotification(@Payload() data: SendSmsDto) {
    try {
      await this.notificationService.createAndSend(data);
    } catch (error) {
      console.error('Error enviando notificación:', error);
    }
  }
}
