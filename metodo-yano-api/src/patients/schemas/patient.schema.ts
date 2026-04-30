import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ _id: false })
class Phones {
  @Prop({ trim: true }) phone1?: string;
  @Prop({ trim: true }) phone2?: string;
  @Prop({ trim: true }) mobile1?: string;
  @Prop({ trim: true }) mobile2?: string;
  @Prop({ type: [String], default: [] }) allNormalized: string[];
}

@Schema({ timestamps: true, collection: 'patients' })
export class Patient {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true }) clinicId: Types.ObjectId;
  @Prop({ required: true, trim: true }) name: string;
  @Prop({ required: true, trim: true, lowercase: true }) nameNormalized: string;
  @Prop({ trim: true }) profession?: string;
  @Prop({ trim: true }) cpf?: string;
  @Prop({ trim: true }) rg?: string;
  @Prop() birthDate?: Date;
  @Prop({ trim: true }) cep?: string;
  @Prop({ trim: true }) address?: string;
  @Prop({ trim: true }) addressNumber?: string;
  @Prop({ trim: true }) addressComplement?: string;
  @Prop({ trim: true }) neighborhood?: string;
  @Prop({ trim: true }) city?: string;
  @Prop({ trim: true }) state?: string;
  @Prop({ trim: true }) email?: string;
  @Prop({ type: Phones, default: {} }) phones: Phones;
  @Prop({ trim: true }) observation?: string;
  @Prop({ trim: true }) anamnesis?: string;
  @Prop({ trim: true }) scapularWaist?: string;
  @Prop({ trim: true }) pelvicWaist?: string;
  @Prop({ type: Types.ObjectId, ref: 'Referral' }) referralId?: Types.ObjectId;
  @Prop({ default: 'ativo', trim: true }) status?: string;
  @Prop() packageSessions?: number;
  @Prop() registrationDate?: Date;
  @Prop({ type: Date, default: null }) deletedAt: Date | null;
  @Prop() legacyId?: number;
  @Prop({ trim: true }) legacySource?: string;
  @Prop({ type: Types.ObjectId, ref: 'LegacyImport' }) importBatchId?: Types.ObjectId;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({ clinicId: 1, nameNormalized: 1 });
PatientSchema.index({ clinicId: 1, cpf: 1 }, { sparse: true });
PatientSchema.index({ clinicId: 1, email: 1 }, { sparse: true });
PatientSchema.index({ clinicId: 1, 'phones.allNormalized': 1 });
