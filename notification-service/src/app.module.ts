import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications/notifications.module';


@Module({
  imports: [NotificationsModule],
})
export class AppModule {}
