import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateProfessionalScheduleDto } from './dto/create-professional-schedule.dto';
import { UpdateProfessionalScheduleDto } from './dto/update-professional-schedule.dto';
import { ProfessionalSchedulesService } from './professional-schedules.service';

@UseGuards(JwtAuthGuard)
@Controller('professional-schedules')
export class ProfessionalSchedulesController {
  constructor(private readonly service: ProfessionalSchedulesService) {}

  @Get() list(@CurrentUser() user: any) { return this.service.list(user.clinicId); }
  @Post() create(@CurrentUser() user: any, @Body() dto: CreateProfessionalScheduleDto) { return this.service.create(user.clinicId, user.id, dto); }
  @Get(':id') find(@CurrentUser() user: any, @Param('id') id: string) { return this.service.findOne(user.clinicId, id); }
  @Patch(':id') update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateProfessionalScheduleDto) { return this.service.update(user.clinicId, user.id, id, dto); }
  @Delete(':id') remove(@CurrentUser() user: any, @Param('id') id: string) { return this.service.remove(user.clinicId, user.id, id); }
}
