import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../persistence/prisma.service';
import { PrismaAppointmentRepository } from '../persistence/prisma/prisma-appointment.repository';
import { PrismaChatMessageRepository } from '../persistence/prisma/prisma-chat-message.repository';
import { PrismaNotificationRepository } from '../persistence/prisma/prisma-notification.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'AppointmentRepository',
      useClass: PrismaAppointmentRepository,
    },
    {
      provide: 'ChatMessageRepository',
      useClass: PrismaChatMessageRepository,
    },
    {
      provide: 'NotificationRepository',
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [
    'AppointmentRepository',
    'ChatMessageRepository',
    'NotificationRepository',
    PrismaService,
  ],
})
export class DatabaseModule {}