import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProfessionalScheduleDocument = HydratedDocument<ProfessionalSchedule>;

@Schema({ timestamps: true, collection: 'professionalSchedules' })
export class ProfessionalSchedule {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinicId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  professionalId: Types.ObjectId;

  @Prop({ required: true, min: 0, max: 6 })
  weekday: number;

  @Prop({ required: true, trim: true })
  startTime: string;

  @Prop({ required: true, trim: true })
  endTime: string;

  @Prop({ required: true, default: 30 })
  slotDurationMinutes: number;

  @Prop({ trim: true })
  breakStartTime?: string;

  @Prop({ trim: true })
  breakEndTime?: string;

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
}

export const ProfessionalScheduleSchema = SchemaFactory.createForClass(ProfessionalSchedule);
ProfessionalScheduleSchema.index(
  { clinicId: 1, professionalId: 1, weekday: 1 },
  { name: 'ix_professional_schedules_clinic_professional_weekday' },
);

ProfessionalScheduleSchema.index(
  { clinicId: 1, professionalId: 1, weekday: 1, startTime: 1, endTime: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null }, name: 'uq_professional_schedule_exact' },
);
