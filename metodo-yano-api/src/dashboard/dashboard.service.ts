import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument, AppointmentStatus } from '../appointments/schemas/appointment.schema';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';
import { endOfDay, startOfDay } from '../common/utils/dates';

interface DashboardMetrics {
  totalPatients: number;
  todayAppointments: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<PatientDocument>,
    @InjectModel(Appointment.name) private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async get(clinicId: string): Promise<DashboardMetrics> {
    const now = new Date();
    const dayStart = startOfDay(now);
    const dayEnd = endOfDay(now);

    const [totalPatients, todayAppointments] = await Promise.all([
      this.patientModel.countDocuments({ clinicId, deletedAt: null }),
      this.appointmentModel.countDocuments({
        clinicId,
        deletedAt: null,
        status: { $ne: AppointmentStatus.CANCELLED },
        startAt: {
          $gte: dayStart,
          $lte: dayEnd,
        },
      }),
    ]);

    return {
      totalPatients,
      todayAppointments,
    };
  }
}
