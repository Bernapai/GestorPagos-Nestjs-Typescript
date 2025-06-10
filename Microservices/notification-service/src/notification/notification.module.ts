import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationEventsController } from './notification.events.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationEventsController],
  providers: [NotificationService],
})
export class NotificationModule { }
