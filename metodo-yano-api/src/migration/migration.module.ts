import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegacyImport, LegacyImportSchema } from './schemas/legacy-import.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LegacyImport.name, schema: LegacyImportSchema }])],
  exports: [MongooseModule],
})
export class MigrationModule {}
