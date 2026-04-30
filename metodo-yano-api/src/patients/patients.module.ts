import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../appointments/schemas/appointment.schema';
import { AuditLog, AuditLogSchema } from '../audit/schemas/audit-log.schema';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }, { name: Appointment.name, schema: AppointmentSchema }, { name: AuditLog.name, schema: AuditLogSchema }])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
