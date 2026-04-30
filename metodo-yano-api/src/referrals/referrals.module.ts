import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from '../audit/schemas/audit-log.schema';
import { Patient, PatientSchema } from '../patients/schemas/patient.schema';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import { Referral, ReferralSchema } from './schemas/referral.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Referral.name, schema: ReferralSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: AuditLog.name, schema: AuditLogSchema },
    ]),
  ],
  controllers: [ReferralsController],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
