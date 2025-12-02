import { Module } from '@nestjs/common';
import { ChatController } from '../api/controllers/chat.controller';
import { SendChatMessageUseCase } from '../../application/use-cases/chat/send-chat-message.use-case';
import { GetAppointmentChatUseCase } from '../../application/use-cases/chat/get-appointment-chat.use-case';

@Module({
  controllers: [ChatController],
  providers: [SendChatMessageUseCase, GetAppointmentChatUseCase],
})
export class ChatModule {}