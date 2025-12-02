import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SendMessageDto } from '../../../application/dtos/chat/send-message.dto';
import { SendChatMessageUseCase } from '../../../application/use-cases/chat/send-chat-message.use-case';
import { GetAppointmentChatUseCase } from '../../../application/use-cases/chat/get-appointment-chat.use-case';

@Controller('appointments/:appointmentId/chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly sendChatMessageUseCase: SendChatMessageUseCase,
    private readonly getAppointmentChatUseCase: GetAppointmentChatUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(
    @Param('appointmentId') appointmentId: string,
    @CurrentUser('sub') userId: string,
    @CurrentUser('role') role: string,
    @Body() dto: SendMessageDto,
  ) {
    // CORRECCIÓN: Orden (id, DTO, userId, role)
    return this.sendChatMessageUseCase.execute(
      appointmentId,
      dto,
      userId,
      role,
    );
  }

  @Get()
  async getMessages(
    @Param('appointmentId') appointmentId: string,
    @Query('limit') limit?: number,
  ) {
    return this.getAppointmentChatUseCase.execute(appointmentId, limit || 50);
  }
}