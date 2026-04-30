import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

type Patient = CreatePatientDto & { id: string; deletedAt: string | null };

@Injectable()
export class PatientsService {
  private readonly rows: Patient[] = [];
  list(q?: string) { return this.rows.filter(p => !p.deletedAt && (!q || p.name.toLowerCase().includes(q.toLowerCase()))); }
  create(dto: CreatePatientDto) { const row = { id: String(this.rows.length + 1), deletedAt: null, ...dto }; this.rows.push(row); return row; }
  find(id: string) { const row = this.rows.find(p => p.id === id && !p.deletedAt); if (!row) throw new NotFoundException(); return row; }
  update(id: string, dto: Partial<CreatePatientDto>) { const row = this.find(id); Object.assign(row, dto); return row; }
  softDelete(id: string) { const row = this.find(id); row.deletedAt = new Date().toISOString(); return { success: true }; }
}
