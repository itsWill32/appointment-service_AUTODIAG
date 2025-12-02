import { Injectable, Inject } from '@nestjs/common';
import { ChatMessageRepository } from '../../../domain/repositories/chat-message.repository';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';

@Injectable()
export class GetAppointmentChatUseCase {
  constructor(
    @Inject('ChatMessageRepository')
    private readonly chatMessageRepository: ChatMessageRepository
  ) {}

  async execute(appointmentId: string, limit?: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.findByAppointmentId(
      new AppointmentId(appointmentId),
      limit,
    );
  }
}