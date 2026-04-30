import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  PROFESSIONAL = 'professional',
  RECEPTIONIST = 'receptionist',
}

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinicId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true, lowercase: true })
  emailNormalized: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: String, enum: Object.values(UserRole), required: true })
  role: UserRole;

  @Prop({ default: false })
  isProfessional: boolean;

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

  createdAt?: Date;

  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ clinicId: 1, emailNormalized: 1 }, { unique: true, name: 'ux_users_clinic_email_normalized' });
