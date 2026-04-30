import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

@Schema({ timestamps: true, collection: 'appointments' })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinicId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true, index: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  professionalId: Types.ObjectId;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, trim: true })
  startTime: string;

  @Prop({ required: true, trim: true })
  endTime: string;

  @Prop({ required: true })
  durationMinutes: number;

  @Prop({ type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @Prop({ trim: true })
  notes?: string;

  @Prop({ trim: true })
  internalNotes?: string;

  @Prop({ trim: true })
  cancellationReason?: string;

  @Prop({ trim: true })
  source?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  @Prop()
  legacyId?: number;

  @Prop({ trim: true })
  legacySource?: string;

  @Prop({ type: Types.ObjectId, ref: 'LegacyImport' })
  importBatchId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  legacyRefs?: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  metadata?: Record<string, unknown>;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.index({ clinicId: 1, professionalId: 1, startAt: 1 }, { name: 'ix_appointments_clinic_professional_start' });
AppointmentSchema.index({ clinicId: 1, patientId: 1, startAt: 1 }, { name: 'ix_appointments_clinic_patient_start' });
