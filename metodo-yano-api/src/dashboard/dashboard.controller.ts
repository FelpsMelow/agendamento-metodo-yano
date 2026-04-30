import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { DashboardMetrics } from './types/dashboard-metrics.type';

interface AuthenticatedUser {
  clinicId: string;
}

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  get(@CurrentUser() user: AuthenticatedUser): Promise<DashboardMetrics> {
    return this.service.get(user.clinicId);
  }
}
