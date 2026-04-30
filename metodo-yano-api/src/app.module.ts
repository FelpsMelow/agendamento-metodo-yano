import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ReferralsModule } from './referrals/referrals.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, PatientsModule, AppointmentsModule, ReferralsModule, DashboardModule],
})
export class AppModule {}
