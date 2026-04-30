import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ExcelJS from 'exceljs';
import { Model, Types } from 'mongoose';
import { AuditLog } from '../audit/schemas/audit-log.schema';
import { Patient } from '../patients/schemas/patient.schema';
import { Referral } from '../referrals/schemas/referral.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    @InjectModel(Referral.name) private readonly referralModel: Model<Referral>,
    @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>,
  ) {}

  async patientsReport(clinicId: string, query: { search?: string; page: number; limit: number }) {
    const filter: any = { clinicId: new Types.ObjectId(clinicId), deletedAt: null };
    if (query.search?.trim()) filter.name = { $regex: query.search.trim(), $options: 'i' };
    const skip = (query.page - 1) * query.limit;
    const [items, total] = await Promise.all([
      this.patientModel.find(filter).sort({ name: 1 }).skip(skip).limit(query.limit).lean(),
      this.patientModel.countDocuments(filter),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async exportPatientsReport(clinicId: string, query: { search?: string }) {
    const data = await this.patientsReport(clinicId, { search: query.search, page: 1, limit: 100000 });
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Relatório de Pacientes');
    ws.addRow(['Matr', 'Nome', 'E-mail', 'Telefones', 'Cintura Escapular', 'Cintura Pélvica']);
    data.items.forEach((p: any) => ws.addRow([p.legacyId ?? String(p._id), p.name, p.email ?? '', [p.phones?.phone1, p.phones?.phone2, p.phones?.mobile1, p.phones?.mobile2].filter(Boolean).join(' / '), p.scapularWaist ?? '', p.pelvicWaist ?? '']));
    await this.auditModel.create({ clinicId, action: 'report.patients.export', entity: 'report', entityId: null, after: { search: query.search ?? null } });
    return wb.xlsx.writeBuffer();
  }

  async referralsReport(clinicId: string) {
    return this.referralModel.find({ clinicId: new Types.ObjectId(clinicId), deletedAt: null }).sort({ name: 1 }).lean();
  }

  async referralsSummaryReport(clinicId: string, query: { startDate?: string; endDate?: string }) {
    const filter: any = { clinicId: new Types.ObjectId(clinicId), deletedAt: null };
    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }
    const rows = await this.patientModel.aggregate([
      { $match: filter },
      { $lookup: { from: 'referrals', localField: 'referralId', foreignField: '_id', as: 'referral' } },
      { $unwind: { path: '$referral', preserveNullAndEmptyArrays: true } },
      { $group: { _id: '$referral.name', quantidade: { $sum: 1 } } },
      { $sort: { quantidade: -1, _id: 1 } },
    ]);
    const totalGeral = rows.reduce((acc, row) => acc + row.quantidade, 0);
    return {
      totalGeral,
      items: rows.map((row) => ({ indicacao: row._id || 'Não informada', quantidade: row.quantidade, percentual: totalGeral ? Number(((row.quantidade / totalGeral) * 100).toFixed(2)) : 0 })),
    };
  }

  async birthdaysReport(clinicId: string, month?: number) {
    const m = month && month >= 1 && month <= 12 ? month : undefined;
    const pipeline: any[] = [
      { $match: { clinicId: new Types.ObjectId(clinicId), deletedAt: null, birthDate: { $ne: null } } },
      { $addFields: { birthMonth: { $month: '$birthDate' }, birthDay: { $dayOfMonth: '$birthDate' } } },
    ];
    if (m) pipeline.push({ $match: { birthMonth: m } });
    pipeline.push({ $sort: { birthDay: 1, name: 1 } });
    pipeline.push({ $project: { name: 1, birthDate: 1, phones: 1 } });
    return this.patientModel.aggregate(pipeline);
  }
}
