import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ListPatientsDto } from './dto/list-patients.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}

  @Get() list(@CurrentUser() user: any, @Query() query: ListPatientsDto) { return this.service.list(user.clinicId, query); }
  @Get('search') search(@CurrentUser() user: any, @Query() query: ListPatientsDto) { return this.service.list(user.clinicId, query); }
  @Post() create(@CurrentUser() user: any, @Body() dto: CreatePatientDto) { return this.service.create(user.clinicId, user.id, dto); }
  @Get('export') @Header('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  async export(@CurrentUser() user: any, @Res() res: Response) { const b=await this.service.exportExcel(user.clinicId); res.setHeader('Content-Disposition','attachment; filename=pacientes.xlsx'); res.send(Buffer.from(b)); }
  @Get(':id') find(@CurrentUser() user: any, @Param('id') id: string) { return this.service.findOne(user.clinicId, id); }
  @Patch(':id') update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdatePatientDto) { return this.service.update(user.clinicId, user.id, id, dto); }
  @Delete(':id') remove(@CurrentUser() user: any, @Param('id') id: string) { return this.service.remove(user.clinicId, user.id, id); }
}
