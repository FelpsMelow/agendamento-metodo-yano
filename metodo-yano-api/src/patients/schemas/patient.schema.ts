import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true, collection: 'patients' })
export class Patient {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinicId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  nameNormalized: string;

  @Prop({ trim: true })
  profession?: string;

  @Prop({ trim: true })
  cpf?: string;

  @Prop({ trim: true })
  rg?: string;

  @Prop()
  birthDate?: Date;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true })
  email?: string;

  @Prop({ type: [String], default: [] })
  phones: string[];

  @Prop({ trim: true })
  observation?: string;

  @Prop({ trim: true })
  anamnesis?: string;

  @Prop({ trim: true })
  scapularWaist?: string;

  @Prop({ trim: true })
  pelvicWaist?: string;

  @Prop({ type: Types.ObjectId, ref: 'Referral' })
  referralId?: Types.ObjectId;

  @Prop({ default: 'active', trim: true })
  status?: string;

  @Prop()
  packageSessions?: number;

  @Prop()
  registrationDate?: Date;

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
  metadata?: Record<string, unknown>;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({ clinicId: 1, nameNormalized: 1 }, { name: 'ix_patients_clinic_name_normalized' });
PatientSchema.index({ clinicId: 1, cpf: 1 }, { sparse: true, name: 'ix_patients_clinic_cpf_sparse' });
