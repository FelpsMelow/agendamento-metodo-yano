import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AppointmentsService } from './appointments.service';
import { ListAppointmentsDto } from './dto/list-appointments.dto';
import { CalendarEventsDto } from './dto/calendar-events.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}
  @Get() list(@CurrentUser() user: any, @Query() query: ListAppointmentsDto) { return this.service.list(user.clinicId, query); }
  @Get('events') events(@CurrentUser() user: any, @Query() query: CalendarEventsDto) { return this.service.events(user.clinicId, query); }
  @Post() create(@CurrentUser() user: any, @Body() dto: CreateAppointmentDto) { return this.service.create(user.clinicId, user.id, dto); }
  @Get(':id') find(@CurrentUser() user: any, @Param('id') id: string) { return this.service.findOne(user.clinicId, id); }
  @Patch(':id') update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAppointmentDto) { return this.service.update(user.clinicId, user.id, id, dto); }
  @Delete(':id') remove(@CurrentUser() user: any, @Param('id') id: string) { return this.service.remove(user.clinicId, user.id, id); }
  @Patch(':id/cancel') cancel(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: CancelAppointmentDto) { return this.service.cancel(user.clinicId, user.id, id, dto.reason); }
  @Patch(':id/status') status(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) { return this.service.updateStatus(user.clinicId, user.id, id, dto.status); }
}
