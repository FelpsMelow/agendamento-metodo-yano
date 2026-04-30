import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from '../audit/schemas/audit-log.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ProfessionalSchedulesController } from './professional-schedules.controller';
import { ProfessionalSchedulesService } from './professional-schedules.service';
import { ProfessionalSchedule, ProfessionalScheduleSchema } from './schemas/professional-schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProfessionalSchedule.name, schema: ProfessionalScheduleSchema },
    { name: User.name, schema: UserSchema },
    { name: AuditLog.name, schema: AuditLogSchema },
  ])],
  controllers: [ProfessionalSchedulesController],
  providers: [ProfessionalSchedulesService],
  exports: [ProfessionalSchedulesService],
})
export class ProfessionalSchedulesModule {}
