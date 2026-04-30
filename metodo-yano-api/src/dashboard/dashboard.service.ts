import { Injectable } from '@nestjs/common';
@Injectable()
export class DashboardService { get(){ return { totalPatients: 0, todayAppointments: 0 }; } }
