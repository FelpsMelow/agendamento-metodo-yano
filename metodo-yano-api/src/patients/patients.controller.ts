import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}
  @Get() list(@Query('q') q?: string) { return this.service.list(q); }
  @Post() create(@Body() dto: CreatePatientDto) { return this.service.create(dto); }
  @Get(':id') find(@Param('id') id: string) { return this.service.find(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: Partial<CreatePatientDto>) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.softDelete(id); }
}
