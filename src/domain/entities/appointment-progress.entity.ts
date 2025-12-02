import { v4 as uuidv4 } from 'uuid';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { ProgressStage } from '../value-objects/progress-stage.vo';

export class AppointmentProgress {
  private readonly id: string;
  private readonly appointmentId: AppointmentId;
  private readonly stage: ProgressStage;
  private description?: string;
  private photos: string[] = [];
  private estimatedCompletion?: Date;
  private readonly createdBy: UserId;
  private readonly createdAt: Date;

  constructor(
    id: string,
    appointmentId: AppointmentId,
    stage: ProgressStage,
    createdBy: UserId,
    createdAt: Date,
  ) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.stage = stage;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  static create(
    appointmentId: AppointmentId,
    stage: ProgressStage,
    createdBy: UserId,
    description?: string,
    photos?: string[],
    estimatedCompletion?: Date,
  ): AppointmentProgress {
    const progress = new AppointmentProgress(
      uuidv4(),
      appointmentId,
      stage,
      createdBy,
      new Date(),
    );
    
    progress.description = description;
    progress.photos = photos || [];
    progress.estimatedCompletion = estimatedCompletion;
    
    return progress;
  }

  getId(): string {
    return this.id;
  }

  getAppointmentId(): AppointmentId {
    return this.appointmentId;
  }

  getStage(): ProgressStage {
    return this.stage;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getPhotos(): string[] {
    return [...this.photos];
  }

  getEstimatedCompletion(): Date | undefined {
    return this.estimatedCompletion;
  }

  getCreatedBy(): UserId {
    return this.createdBy;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  addPhoto(photoUrl: string): void {
    if (!photoUrl || photoUrl.trim().length === 0) {
      throw new Error('Photo URL cannot be empty');
    }
    this.photos.push(photoUrl);
  }
}