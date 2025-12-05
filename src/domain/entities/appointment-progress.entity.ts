import { v4 as uuidv4 } from 'uuid';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { ProgressStage } from '../value-objects/progress-stage.vo';

export class AppointmentProgress {
  private readonly _id: string;
  private readonly _appointmentId: AppointmentId;
  private readonly _stage: ProgressStage;
  private _description?: string;
  private _photos: string[] = [];
  private _estimatedCompletion?: Date;
  private readonly _createdBy: UserId;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    appointmentId: AppointmentId,
    stage: ProgressStage,
    createdBy: UserId,
    createdAt: Date,
  ) {
    this._id = id;
    this._appointmentId = appointmentId;
    this._stage = stage;
    this._createdBy = createdBy;
    this._createdAt = createdAt;
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
    
    progress._description = description;
    progress._photos = photos || [];
    progress._estimatedCompletion = estimatedCompletion;
    
    return progress;
  }

  get id(): string { return this._id; }
  get appointmentId(): AppointmentId { return this._appointmentId; }
  get stage(): ProgressStage { return this._stage; }
  get createdBy(): UserId { return this._createdBy; }
  get description(): string | undefined { return this._description; }
  get photos(): string[] { return [...this._photos]; }
  get estimatedCompletion(): Date | undefined { return this._estimatedCompletion; }
  get createdAt(): Date { return this._createdAt; }

  getId(): string {
    return this._id;
  }

  getAppointmentId(): AppointmentId {
    return this._appointmentId;
  }

  getStage(): ProgressStage {
    return this._stage;
  }

  getDescription(): string | undefined {
    return this._description;
  }

  getPhotos(): string[] {
    return [...this._photos];
  }

  getEstimatedCompletion(): Date | undefined {
    return this._estimatedCompletion;
  }

  getCreatedBy(): UserId {
    return this._createdBy;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  addPhoto(photoUrl: string): void {
    if (!photoUrl || photoUrl.trim().length === 0) {
      throw new Error('Photo URL cannot be empty');
    }
    this._photos.push(photoUrl);
  }

  toJSON() {
    return {
      id: this._id,
      appointmentId: this._appointmentId.getValue(),
      stage: this._stage.getValue(),
      description: this._description,
      photos: this._photos,
      estimatedCompletion: this._estimatedCompletion,
      createdBy: this._createdBy.getValue(),
      createdAt: this._createdAt,
    };
  }
}