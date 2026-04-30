import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReferralDocument = HydratedDocument<Referral>;

@Schema({ timestamps: true, collection: 'referrals' })
export class Referral {
  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinicId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  nameNormalized: string;

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

export const ReferralSchema = SchemaFactory.createForClass(Referral);
ReferralSchema.index({ clinicId: 1, nameNormalized: 1 }, { name: 'ix_referrals_clinic_name_normalized' });
