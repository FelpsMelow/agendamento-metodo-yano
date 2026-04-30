import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ReferralsModule } from './referrals/referrals.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MigrationModule } from './migration/migration.module';
import { AuditModule } from './audit/audit.module';
import { ProfessionalSchedulesModule } from './professional-schedules/professional-schedules.module';
import { ProfessionalsModule } from './professionals/professionals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig, databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ClinicsModule,
    PatientsModule,
    AppointmentsModule,
    ReferralsModule,
    ReportsModule,
    DashboardModule,
    MigrationModule,
    AuditModule,
    ProfessionalSchedulesModule,
    ProfessionalsModule,
  ],
})
export class AppModule {}
