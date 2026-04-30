import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClinicDocument = HydratedDocument<Clinic>;

@Schema({ timestamps: true, collection: 'clinics' })
export class Clinic {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true, unique: true })
  slug: string;

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

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
