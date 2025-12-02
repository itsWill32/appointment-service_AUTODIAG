import { Appointment } from '../entities/appointment.entity';
import { AppointmentId } from '../value-objects/appointment-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { WorkshopId } from '../value-objects/workshop-id.vo';
import { AppointmentStatus } from '../value-objects/appointment-status.vo';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  
  findById(id: AppointmentId): Promise<Appointment | null>;
  findByUserId(userId: UserId, limit?: number): Promise<Appointment[]>;
  findByWorkshopId(workshopId: WorkshopId, limit?: number): Promise<Appointment[]>;
  findByStatus(status: AppointmentStatus): Promise<Appointment[]>;
  findByUserIdAndStatus(userId: UserId, status: AppointmentStatus): Promise<Appointment[]>;
  findByWorkshopIdAndStatus(workshopId: WorkshopId, status: AppointmentStatus): Promise<Appointment[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;
  
  update(appointment: Appointment): Promise<void>;
  
  delete(id: AppointmentId): Promise<void>;
  
  existsForUserAndWorkshop(userId: UserId, workshopId: WorkshopId, scheduledDate: Date): Promise<boolean>;
  countByWorkshopAndDate(workshopId: WorkshopId, date: Date): Promise<number>;
}