import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LegacyImportDocument = HydratedDocument<LegacyImport>;

@Schema({ timestamps: true, collection: 'legacyImports' })
export class LegacyImport {
  @Prop({ required: true, trim: true })
  source: string;

  @Prop({ required: true, trim: true })
  sourceName: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  finishedAt?: Date;

  @Prop({ required: true, trim: true })
  status: string;

  @Prop({ type: Object, default: {} })
  totals?: Record<string, unknown>;

  @Prop({ type: [Object], default: [] })
  errors?: Record<string, unknown>[];
}

export const LegacyImportSchema = SchemaFactory.createForClass(LegacyImport);
