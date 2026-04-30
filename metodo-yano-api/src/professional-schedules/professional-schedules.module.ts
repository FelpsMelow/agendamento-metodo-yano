import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchedule, ProfessionalScheduleSchema } from './schemas/professional-schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProfessionalSchedule.name, schema: ProfessionalScheduleSchema }])],
  exports: [MongooseModule],
})
export class ProfessionalSchedulesModule {}
