import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { normalizeText } from '../common/utils/normalize';
import { AuditLog } from '../audit/schemas/audit-log.schema';
import { Patient } from '../patients/schemas/patient.schema';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ListReferralsDto } from './dto/list-referrals.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral } from './schemas/referral.schema';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectModel(Referral.name) private readonly referralModel: Model<Referral>,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>,
  ) {}

  async list(clinicId: string, query: ListReferralsDto) {
    const filter: any = { clinicId: new Types.ObjectId(clinicId), deletedAt: null };
    if (query.q?.trim()) {
      filter.name = { $regex: query.q.trim(), $options: 'i' };
    }

    const skip = (query.page - 1) * query.limit;
    const [items, total] = await Promise.all([
      this.referralModel.find(filter).sort({ name: 1 }).skip(skip).limit(query.limit).lean(),
      this.referralModel.countDocuments(filter),
    ]);

    return { items, page: query.page, limit: query.limit, total };
  }

  async create(clinicId: string, userId: string, dto: CreateReferralDto) {
    if (!dto.name?.trim()) throw new BadRequestException('Indicação é obrigatória.');
    const name = dto.name.trim();
    const nameNormalized = normalizeText(name);

    const duplicate = await this.referralModel.exists({ clinicId, nameNormalized, deletedAt: null });
    if (duplicate) throw new BadRequestException('Já existe uma indicação com esse nome.');

    const created = await this.referralModel.create({ clinicId, name, nameNormalized });
    await this.auditModel.create({ clinicId, userId, action: 'referral.create', entity: 'referral', entityId: created._id, after: { name } });
    return created;
  }

  async findOne(clinicId: string, id: string) {
    const referral = await this.referralModel.findOne({ _id: id, clinicId, deletedAt: null }).lean();
    if (!referral) throw new NotFoundException('Indicação não encontrada.');
    return referral;
  }

  async update(clinicId: string, userId: string, id: string, dto: UpdateReferralDto) {
    const existing = await this.referralModel.findOne({ _id: id, clinicId, deletedAt: null });
    if (!existing) throw new NotFoundException('Indicação não encontrada.');

    const nextName = dto.name?.trim() ?? existing.name;
    if (!nextName) throw new BadRequestException('Indicação é obrigatória.');
    const nextNormalized = normalizeText(nextName);

    const duplicate = await this.referralModel.exists({ _id: { $ne: id }, clinicId, nameNormalized: nextNormalized, deletedAt: null });
    if (duplicate) throw new BadRequestException('Já existe uma indicação com esse nome.');

    existing.name = nextName;
    existing.nameNormalized = nextNormalized;
    await existing.save();

    await this.auditModel.create({ clinicId, userId, action: 'referral.update', entity: 'referral', entityId: existing._id, after: { name: nextName } });
    return existing;
  }

  async remove(clinicId: string, userId: string, id: string) {
    const referral = await this.referralModel.findOne({ _id: id, clinicId, deletedAt: null });
    if (!referral) throw new NotFoundException('Indicação não encontrada.');

    const hasPatients = await this.patientModel.exists({ clinicId, referralId: referral._id, deletedAt: null });
    referral.deletedAt = new Date();
    referral.isActive = false;
    await referral.save();

    await this.auditModel.create({ clinicId, userId, action: 'referral.delete', entity: 'referral', entityId: referral._id, after: { hasPatients: !!hasPatients } });
    return { success: true, hasPatients: !!hasPatients };
  }
}
