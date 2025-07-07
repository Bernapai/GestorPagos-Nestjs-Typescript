import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationEventsController } from './events/notification.events.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationEventsController],
  providers: [NotificationService],
})
export class NotificationModule { }
