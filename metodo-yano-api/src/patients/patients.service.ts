import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import ExcelJS from 'exceljs';
import { Appointment } from '../appointments/schemas/appointment.schema';
import { AuditLog } from '../audit/schemas/audit-log.schema';
import { normalizeText } from '../common/utils/normalize';
import { ListPatientsDto } from './dto/list-patients.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    @InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>,
    @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>,
  ) {}

  private phones(dto: Partial<CreatePatientDto>) {
    const norm=(v:string)=>v.replace(/\D/g,'');
    const all = [dto.phone1, dto.phone2, dto.mobile1, dto.mobile2].filter(Boolean).map((v) => norm(v as string));
    return { phone1: dto.phone1, phone2: dto.phone2, mobile1: dto.mobile1, mobile2: dto.mobile2, allNormalized: all };
  }

  async list(clinicId: string, query: ListPatientsDto) {
    const filter: any = { clinicId: new Types.ObjectId(clinicId), deletedAt: null };
    if (query.q) {
      const q = query.q.trim();
      filter.$or = [{ name: { $regex: q, $options: 'i' } }, { cpf: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }, { 'phones.allNormalized': { $regex: q.replace(/\D/g, ''), $options: 'i' } }];
    }
    const skip = (query.page - 1) * query.limit;
    const [items, total] = await Promise.all([
      this.patientModel.find(filter).sort({ name: 1 }).skip(skip).limit(query.limit).lean(),
      this.patientModel.countDocuments(filter),
    ]);
    return { items, page: query.page, limit: query.limit, total };
  }

  async create(clinicId: string, userId: string, dto: CreatePatientDto) {
    if (!dto.name?.trim()) throw new BadRequestException('Nome é obrigatório.');
    const created = await this.patientModel.create({ ...dto, clinicId, nameNormalized: normalizeText(dto.name), phones: this.phones(dto), birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined, registrationDate: dto.registrationDate ? new Date(dto.registrationDate) : undefined });
    await this.auditModel.create({ clinicId, userId, action: 'patient.create', entity: 'patient', entityId: created._id, after: dto });
    return created;
  }

  async findOne(clinicId: string, id: string) {
    const patient = await this.patientModel.findOne({ _id: id, clinicId, deletedAt: null }).lean();
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  async update(clinicId: string, userId: string, id: string, dto: UpdatePatientDto) {
    const updated = await this.patientModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { ...dto, ...(dto.name ? { nameNormalized: normalizeText(dto.name) } : {}), phones: this.phones(dto), ...(dto.birthDate ? { birthDate: new Date(dto.birthDate) } : {}), ...(dto.registrationDate ? { registrationDate: new Date(dto.registrationDate) } : {}) }, { new: true });
    if (!updated) throw new NotFoundException('Paciente não encontrado.');
    await this.auditModel.create({ clinicId, userId, action: 'patient.update', entity: 'patient', entityId: updated._id, after: dto });
    return updated;
  }

  async remove(clinicId: string, userId: string, id: string) {
    const hasAppointments = await this.appointmentModel.exists({ clinicId, patientId: id, deletedAt: null });
    const deleted = await this.patientModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { deletedAt: new Date(), status: 'inativo' }, { new: true });
    if (!deleted) throw new NotFoundException('Paciente não encontrado.');
    await this.auditModel.create({ clinicId, userId, action: 'patient.delete', entity: 'patient', entityId: deleted._id, after: { hasAppointments: !!hasAppointments } });
    return { success: true };
  }

  async exportExcel(clinicId: string) {
    const rows = await this.patientModel.find({ clinicId, deletedAt: null }).sort({ name: 1 }).lean();
    const wb = new ExcelJS.Workbook(); const ws = wb.addWorksheet('Pacientes');
    ws.addRow(['Matr', 'Nome', 'E-mail', 'CPF', 'Telefones']);
    rows.forEach((r) => ws.addRow([r.legacyId ?? String(r._id), r.name, r.email ?? '', r.cpf ?? '', r.phones?.allNormalized?.join(' / ') ?? '']));
    return wb.xlsx.writeBuffer();
  }
}
