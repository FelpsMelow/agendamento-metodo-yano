import { Controller, Get, Header, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('patients')
  patients(@CurrentUser() user: any, @Query('search') search?: string, @Query('page') page = '1', @Query('limit') limit = '10') {
    return this.service.patientsReport(user.clinicId, { search, page: Number(page), limit: Number(limit) });
  }

  @Get('patients/export')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  async exportPatients(@CurrentUser() user: any, @Res() res: Response, @Query('search') search?: string) {
    const file = await this.service.exportPatientsReport(user.clinicId, { search });
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-pacientes.xlsx');
    res.send(Buffer.from(file));
  }

  @Get('referrals') referrals(@CurrentUser() user: any) { return this.service.referralsReport(user.clinicId); }
  @Get('referrals-summary') referralsSummary(@CurrentUser() user: any, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) { return this.service.referralsSummaryReport(user.clinicId, { startDate, endDate }); }
  @Get('birthdays') birthdays(@CurrentUser() user: any, @Query('month') month?: string) { return this.service.birthdaysReport(user.clinicId, Number(month) || undefined); }
}
