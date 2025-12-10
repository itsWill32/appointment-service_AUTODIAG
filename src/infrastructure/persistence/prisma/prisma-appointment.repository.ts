import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppointmentRepository } from '../../../domain/repositories/appointment.repository';
import { Appointment } from '../../../domain/entities/appointment.entity';
import { AppointmentId } from '../../../domain/value-objects/appointment-id.vo';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { VehicleId } from '../../../domain/value-objects/vehicle-id.vo';
import { WorkshopId } from '../../../domain/value-objects/workshop-id.vo';
import { ServiceType } from '../../../domain/value-objects/service-type.vo';
import { AppointmentStatus } from '../../../domain/value-objects/appointment-status.vo';
import { ScheduledTime } from '../../../domain/value-objects/scheduled-time.vo';
import { Money } from '../../../domain/value-objects/money.vo';
import { AppointmentProgress } from '../../../domain/entities/appointment-progress.entity';
import { ProgressStage } from '../../../domain/value-objects/progress-stage.vo';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { AppointmentStatus as PrismaAppointmentStatus } from '@prisma/client';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async save(appointment: Appointment): Promise<void> {
    await this.prisma.appointment.create({
      data: {
        id: appointment.getId().getValue(),
        userId: appointment.getUserId().getValue(),
        vehicleId: appointment.getVehicleId().getValue(),
        workshopId: appointment.getWorkshopId().getValue(),
        diagnosisId: appointment.getDiagnosisId(),
        serviceType: appointment.getServiceType().toString(),
        description: appointment.getDescription(),
        scheduledDate: appointment.getScheduledDate(),
        scheduledTime: appointment.getScheduledTime().toString(),
        estimatedDuration: appointment.getEstimatedDuration(),
        status: appointment.getStatus().toString() as PrismaAppointmentStatus,
        estimatedCost: appointment.getEstimatedCost()?.getAmount(),
        finalCost: appointment.getFinalCost()?.getAmount(),
        cancelledAt: appointment.getCancelledAt(),
        cancelReason: appointment.getCancelReason(),
        cancelledBy: appointment.getCancelledBy(),
        completedAt: appointment.getCompletedAt(),
        notes: appointment.getNotes(),
        photos: appointment.getPhotos(),
        documents: appointment.getDocuments(),
        createdAt: appointment.getCreatedAt(),
        updatedAt: appointment.getUpdatedAt(),
      },
    });
  }

  async findById(id: AppointmentId): Promise<Appointment | null> {
    const data = await this.prisma.appointment.findUnique({
      where: { id: id.getValue() },
      include: {
        progress: true,
        messages: true,
      },
    });

    if (!data) return null;

    return this.toDomain(data);
  }

  async findByUserId(userId: UserId, limit: number = 10): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: { userId: userId.getValue() },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByWorkshopId(workshopId: WorkshopId, limit: number = 10): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: { workshopId: workshopId.getValue() },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByStatus(status: AppointmentStatus): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: { status: status.toString() as PrismaAppointmentStatus },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByUserIdAndStatus(userId: UserId, status: AppointmentStatus): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: {
        userId: userId.getValue(),
        status: status.toString() as PrismaAppointmentStatus,
      },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByWorkshopIdAndStatus(workshopId: WorkshopId, status: AppointmentStatus): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: {
        workshopId: workshopId.getValue(),
        status: status.toString() as PrismaAppointmentStatus,
      },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    const results = await this.prisma.appointment.findMany({
      where: {
        scheduledDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        progress: true,
        messages: true,
      },
      orderBy: { scheduledDate: 'asc' },
    });

    return results.map((data) => this.toDomain(data));
  }

  async update(appointment: Appointment): Promise<void> {
    await this.prisma.appointment.update({
      where: { id: appointment.getId().getValue() },
      data: {
        serviceType: appointment.getServiceType().toString(),
        description: appointment.getDescription(),
        scheduledDate: appointment.getScheduledDate(),
        scheduledTime: appointment.getScheduledTime().toString(),
        estimatedDuration: appointment.getEstimatedDuration(),
        status: appointment.getStatus().toString() as PrismaAppointmentStatus,
        estimatedCost: appointment.getEstimatedCost()?.getAmount(),
        finalCost: appointment.getFinalCost()?.getAmount(),
        cancelledAt: appointment.getCancelledAt(),
        cancelReason: appointment.getCancelReason(),
        cancelledBy: appointment.getCancelledBy(),
        completedAt: appointment.getCompletedAt(),
        notes: appointment.getNotes(),
        photos: appointment.getPhotos(),
        documents: appointment.getDocuments(),
        updatedAt: appointment.getUpdatedAt(),
      },
    });

    const progressList = appointment.getProgress();
    if (progressList.length > 0) {
      await Promise.all(progressList.map(p =>
        this.prisma.appointmentProgress.upsert({
          where: { id: p.id },
          create: {
            id: p.id,
            appointmentId: appointment.getId().getValue(),
            stage: p.stage.toString() as any,
            createdBy: p.createdBy.getValue(),
            description: p.description,
            photos: p.photos,
            estimatedCompletion: p.estimatedCompletion,
            createdAt: p.createdAt,
          },
          update: {
            stage: p.stage.toString() as any,
            description: p.description,
            photos: p.photos,
            estimatedCompletion: p.estimatedCompletion,
          }
        })
      ));
    }

    // Sincronizar Mensajes usando Getters Públicos
    const messagesList = appointment.getMessages();
    if (messagesList.length > 0) {
      await Promise.all(messagesList.map(m =>
        this.prisma.chatMessage.upsert({
          where: { id: m.id }, // Getter público .id
          create: {
            id: m.id,
            appointmentId: appointment.getId().getValue(),
            senderId: m.senderId.getValue(),
            senderRole: m.senderRole,
            message: m.message,
            attachments: m.attachments ?? [],
            isRead: m.isRead,
            readAt: m.readAt,
            createdAt: m.createdAt,
          },
          update: {
            isRead: m.isRead,
            readAt: m.readAt,
          }
        })
      ));
    }
  }

  async delete(id: AppointmentId): Promise<void> {
    await this.prisma.appointment.delete({
      where: { id: id.getValue() },
    });
  }

  async existsForUserAndWorkshop(userId: UserId, workshopId: WorkshopId, scheduledDate: Date): Promise<boolean> {
    const count = await this.prisma.appointment.count({
      where: {
        userId: userId.getValue(),
        workshopId: workshopId.getValue(),
        scheduledDate: {
          gte: new Date(scheduledDate.setHours(0, 0, 0, 0)),
          lt: new Date(scheduledDate.setHours(23, 59, 59, 999)),
        },
        status: {
          notIn: ['CANCELLED', 'COMPLETED'],
        },
      },
    });

    return count > 0;
  }

  async countByWorkshopAndDate(workshopId: WorkshopId, date: Date): Promise<number> {
    return this.prisma.appointment.count({
      where: {
        workshopId: workshopId.getValue(),
        scheduledDate: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
        status: {
          notIn: ['CANCELLED'],
        },
      },
    });
  }

  async count(): Promise<number> {
    return this.prisma.appointment.count();
  }

  private toDomain(data: any): Appointment {
    const appointment = new Appointment(
      new AppointmentId(data.id),
      new UserId(data.userId),
      new VehicleId(data.vehicleId),
      new WorkshopId(data.workshopId),
      new ServiceType(data.serviceType),
      new Date(data.scheduledDate),
      new ScheduledTime(data.scheduledTime),
      new AppointmentStatus(data.status),
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );

    if (data.diagnosisId) (appointment as any).diagnosisId = data.diagnosisId;
    if (data.description) (appointment as any).description = data.description;
    if (data.estimatedDuration) (appointment as any).estimatedDuration = data.estimatedDuration;
    if (data.estimatedCost) (appointment as any).estimatedCost = new Money(data.estimatedCost);
    if (data.finalCost) (appointment as any).finalCost = new Money(data.finalCost);
    if (data.cancelledAt) (appointment as any).cancelledAt = new Date(data.cancelledAt);
    if (data.cancelReason) (appointment as any).cancelReason = data.cancelReason;
    if (data.cancelledBy) (appointment as any).cancelledBy = data.cancelledBy;
    if (data.completedAt) (appointment as any).completedAt = new Date(data.completedAt);
    if (data.notes) (appointment as any).notes = data.notes;
    if (data.photos) (appointment as any).photos = data.photos;
    if (data.documents) (appointment as any).documents = data.documents;

    if (data.progress) {
      const progressList = data.progress.map((p: any) => {
        const progress = new AppointmentProgress(
          p.id,
          new AppointmentId(p.appointmentId),
          new ProgressStage(p.stage),
          new UserId(p.createdBy),
          new Date(p.createdAt),
        );
        if (p.description) (progress as any)._description = p.description;
        if (p.photos) (progress as any)._photos = p.photos;
        if (p.estimatedCompletion) (progress as any)._estimatedCompletion = new Date(p.estimatedCompletion);
        return progress;
      });
      (appointment as any).progress = progressList;
    }

    if (data.messages) {
      const messagesList = data.messages.map((m: any) => {
        const message = new ChatMessage(
          m.id,
          new AppointmentId(m.appointmentId),
          new UserId(m.senderId),
          m.senderRole,
          m.message,
          new Date(m.createdAt),
        );
        // Accedemos a las propiedades con guion bajo
        if (m.attachments) (message as any)._attachments = m.attachments;
        if (m.isRead) {
          (message as any)._isRead = m.isRead;
          if (m.readAt) (message as any)._readAt = new Date(m.readAt);
        }
        return message;
      });
      (appointment as any).messages = messagesList;
    }

    return appointment;
  }
}