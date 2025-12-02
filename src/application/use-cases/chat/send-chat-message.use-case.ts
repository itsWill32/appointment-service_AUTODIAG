import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from '../../../domain/repositories/chat-message.repository';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { SendMessageDto } from '../../dtos/chat/send-message.dto';
import { AppointmentNotFoundException } from '../../../domain/exceptions/appointment.exceptions';

@Injectable()
export class SendChatMessageUseCase {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(
    appointmentId: string,
    dto: SendMessageDto,
    senderId: string,
    senderRole: string,
  ): Promise<ChatMessage> {
    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(appointmentId),
    );

    if (!appointment) {
      throw new AppointmentNotFoundException(appointmentId);
    }

    const message = ChatMessage.create(
      new AppointmentId(appointmentId),
      new UserId(senderId),
      senderRole,
      dto.message,
      dto.attachments,
    );

    await this.chatMessageRepository.save(message);

    return message;
  }
}