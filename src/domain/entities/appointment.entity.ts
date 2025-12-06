import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { VehicleId } from '../value-objects/vehicle-id.vo';
import { WorkshopId } from '../value-objects/workshop-id.vo';
import { ServiceType } from '../value-objects/service-type.vo';
import { AppointmentStatus } from '../value-objects/appointment-status.vo';
import { ScheduledTime } from '../value-objects/scheduled-time.vo';
import { Money } from '../value-objects/money.vo';
import { AppointmentProgress } from './appointment-progress.entity';
import { ChatMessage } from './chat-message.entity';

export class Appointment {
  private readonly id: AppointmentId;
  private readonly userId: UserId;
  private readonly vehicleId: VehicleId;
  private readonly workshopId: WorkshopId;
  private diagnosisId?: string;
  
  private serviceType: ServiceType;
  private description?: string;
  
  private scheduledDate: Date;
  private scheduledTime: ScheduledTime;
  private estimatedDuration?: number;
  
  private status: AppointmentStatus;
  
  private estimatedCost?: Money;
  private finalCost?: Money;
  
  private progress: AppointmentProgress[] = [];
  private messages: ChatMessage[] = [];
  
  private cancelledAt?: Date;
  private cancelReason?: string;
  private cancelledBy?: string;
  
  private completedAt?: Date;
  private notes?: string;
  
  private photos: string[] = [];
  private documents: string[] = [];
  
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: AppointmentId,
    userId: UserId,
    vehicleId: VehicleId,
    workshopId: WorkshopId,
    serviceType: ServiceType,
    scheduledDate: Date,
    scheduledTime: ScheduledTime,
    status: AppointmentStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.vehicleId = vehicleId;
    this.workshopId = workshopId;
    this.serviceType = serviceType;
    this.scheduledDate = scheduledDate;
    this.scheduledTime = scheduledTime;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    userId: UserId,
    vehicleId: VehicleId,
    workshopId: WorkshopId,
    serviceType: ServiceType,
    scheduledDate: Date,
    scheduledTime: ScheduledTime,
    description?: string,
    diagnosisId?: string,
  ): Appointment {
    const appointment = new Appointment(
      AppointmentId.generate(),
      userId,
      vehicleId,
      workshopId,
      serviceType,
      scheduledDate,
      scheduledTime,
      AppointmentStatus.pending(),
      new Date(),
      new Date(),
    );
    
    appointment.description = description;
    appointment.diagnosisId = diagnosisId;
    
    return appointment;
  }

  getId(): AppointmentId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getVehicleId(): VehicleId {
    return this.vehicleId;
  }

  getWorkshopId(): WorkshopId {
    return this.workshopId;
  }

  getDiagnosisId(): string | undefined {
    return this.diagnosisId;
  }

  getServiceType(): ServiceType {
    return this.serviceType;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getScheduledDate(): Date {
    return this.scheduledDate;
  }

  getScheduledTime(): ScheduledTime {
    return this.scheduledTime;
  }

  getEstimatedDuration(): number | undefined {
    return this.estimatedDuration;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }

  getEstimatedCost(): Money | undefined {
    return this.estimatedCost;
  }

  getFinalCost(): Money | undefined {
    return this.finalCost;
  }

  getProgress(): AppointmentProgress[] {
    return [...this.progress];
  }

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  getCancelledAt(): Date | undefined {
    return this.cancelledAt;
  }

  getCancelReason(): string | undefined {
    return this.cancelReason;
  }

  getCancelledBy(): string | undefined {
    return this.cancelledBy;
  }

  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }

  getNotes(): string | undefined {
    return this.notes;
  }

  getPhotos(): string[] {
    return [...this.photos];
  }

  getDocuments(): string[] {
    return [...this.documents];
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  confirm(): void {
    if (!this.status.isPending()) {
      throw new Error('Only pending appointments can be confirmed');
    }

    this.status = AppointmentStatus.confirmed(); 
    this.updatedAt = new Date();
  }

  startService(): void {
    if (!this.status.isConfirmed() && !this.status.isPending()) {
      throw new Error('Appointment must be CONFIRMED or PENDING to start');
    }
    this.status = AppointmentStatus.inProgress();
    this.updatedAt = new Date();
  }

  complete(finalCost: Money, notes?: string): void {
    if (!this.status.isInProgress()) {
      throw new Error('Only in-progress appointments can be completed');
    }
    this.status = AppointmentStatus.completed();
    this.finalCost = finalCost;
    this.notes = notes;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  cancel(reason: string, cancelledBy: string): void {
    if (!this.status.canBeCancelled()) {
      throw new Error('This appointment cannot be cancelled');
    }
    this.status = AppointmentStatus.cancelled();
    this.cancelReason = reason;
    this.cancelledBy = cancelledBy;
    this.cancelledAt = new Date();
    this.updatedAt = new Date();
  }

  reschedule(newDate: Date, newTime: ScheduledTime): void {
    if (!this.status.canBeModified()) {
      throw new Error('This appointment cannot be rescheduled');
    }
    this.scheduledDate = newDate;
    this.scheduledTime = newTime;
    this.updatedAt = new Date();
  }

  setEstimatedCost(cost: Money): void {
    this.estimatedCost = cost;
    this.updatedAt = new Date();
  }

  setEstimatedDuration(minutes: number): void {
    if (minutes <= 0) {
      throw new Error('Duration must be positive');
    }
    this.estimatedDuration = minutes;
    this.updatedAt = new Date();
  }

  addProgress(progressItem: AppointmentProgress): void {
    this.progress.push(progressItem);
    this.updatedAt = new Date();
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.updatedAt = new Date();
  }

  addPhoto(photoUrl: string): void {
    if (!photoUrl || photoUrl.trim().length === 0) {
      throw new Error('Photo URL cannot be empty');
    }
    this.photos.push(photoUrl);
    this.updatedAt = new Date();
  }

  addDocument(documentUrl: string): void {
    if (!documentUrl || documentUrl.trim().length === 0) {
      throw new Error('Document URL cannot be empty');
    }
    this.documents.push(documentUrl);
    this.updatedAt = new Date();
  }
}