import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog } from '../audit/schemas/audit-log.schema';
import { User } from '../users/schemas/user.schema';
import { CreateProfessionalScheduleDto } from './dto/create-professional-schedule.dto';
import { UpdateProfessionalScheduleDto } from './dto/update-professional-schedule.dto';
import { ProfessionalSchedule } from './schemas/professional-schedule.schema';

@Injectable()
export class ProfessionalSchedulesService {
  constructor(
    @InjectModel(ProfessionalSchedule.name) private readonly scheduleModel: Model<ProfessionalSchedule>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>,
  ) {}

  private toMinutes(value: string) { const [h, m] = value.split(':').map(Number); return h * 60 + m; }

  private validateTimeRange(startTime?: string, endTime?: string, breakStartTime?: string, breakEndTime?: string) {
    if (startTime && endTime && this.toMinutes(endTime) <= this.toMinutes(startTime)) {
      throw new BadRequestException('Hora final deve ser maior que hora inicial.');
    }
    if ((breakStartTime && !breakEndTime) || (!breakStartTime && breakEndTime)) {
      throw new BadRequestException('Informe intervalo inicial e final.');
    }
    if (breakStartTime && breakEndTime) {
      const start = this.toMinutes(startTime!);
      const end = this.toMinutes(endTime!);
      const bStart = this.toMinutes(breakStartTime);
      const bEnd = this.toMinutes(breakEndTime);
      if (bEnd <= bStart) throw new BadRequestException('Intervalo final deve ser maior que o intervalo inicial.');
      if (bStart < start || bEnd > end) throw new BadRequestException('Intervalo deve estar dentro do horário de atendimento.');
    }
  }

  async list(clinicId: string) {
    return this.scheduleModel.find({ clinicId, deletedAt: null }).populate('professionalId', 'name').sort({ weekday: 1, startTime: 1 }).lean();
  }

  async create(clinicId: string, userId: string, dto: CreateProfessionalScheduleDto) {
    const professional = await this.userModel.exists({ _id: dto.professionalId, clinicId, isProfessional: true, deletedAt: null });
    if (!professional) throw new BadRequestException('Profissional não encontrado.');
    this.validateTimeRange(dto.startTime, dto.endTime, dto.breakStartTime, dto.breakEndTime);

    const duplicate = await this.scheduleModel.exists({ clinicId, professionalId: dto.professionalId, weekday: dto.weekday, startTime: dto.startTime, endTime: dto.endTime, deletedAt: null });
    if (duplicate) throw new BadRequestException('Já existe um horário idêntico para este profissional.');

    const created = await this.scheduleModel.create({ clinicId, ...dto, isActive: dto.isActive ?? true });
    await this.auditModel.create({ clinicId, userId, action: 'professionalSchedule.create', entity: 'professionalSchedule', entityId: created._id, after: dto });
    return created;
  }

  async findOne(clinicId: string, id: string) {
    const item = await this.scheduleModel.findOne({ _id: id, clinicId, deletedAt: null }).populate('professionalId', 'name').lean();
    if (!item) throw new NotFoundException('Horário de atendimento não encontrado.');
    return item;
  }

  async update(clinicId: string, userId: string, id: string, dto: UpdateProfessionalScheduleDto) {
    const existing = await this.scheduleModel.findOne({ _id: id, clinicId, deletedAt: null });
    if (!existing) throw new NotFoundException('Horário de atendimento não encontrado.');

    if (dto.professionalId) {
      const professional = await this.userModel.exists({ _id: dto.professionalId, clinicId, isProfessional: true, deletedAt: null });
      if (!professional) throw new BadRequestException('Profissional não encontrado.');
    }

    const next = {
      professionalId: dto.professionalId ?? (existing.professionalId as Types.ObjectId).toString(),
      weekday: dto.weekday ?? existing.weekday,
      startTime: dto.startTime ?? existing.startTime,
      endTime: dto.endTime ?? existing.endTime,
      breakStartTime: dto.breakStartTime ?? existing.breakStartTime,
      breakEndTime: dto.breakEndTime ?? existing.breakEndTime,
    };
    this.validateTimeRange(next.startTime, next.endTime, next.breakStartTime, next.breakEndTime);

    const duplicate = await this.scheduleModel.exists({ _id: { $ne: id }, clinicId, professionalId: next.professionalId, weekday: next.weekday, startTime: next.startTime, endTime: next.endTime, deletedAt: null });
    if (duplicate) throw new BadRequestException('Já existe um horário idêntico para este profissional.');

    Object.assign(existing, dto);
    await existing.save();
    await this.auditModel.create({ clinicId, userId, action: 'professionalSchedule.update', entity: 'professionalSchedule', entityId: existing._id, after: dto });
    return existing;
  }

  async remove(clinicId: string, userId: string, id: string) {
    const existing = await this.scheduleModel.findOne({ _id: id, clinicId, deletedAt: null });
    if (!existing) throw new NotFoundException('Horário de atendimento não encontrado.');
    existing.deletedAt = new Date();
    existing.isActive = false;
    await existing.save();
    await this.auditModel.create({ clinicId, userId, action: 'professionalSchedule.delete', entity: 'professionalSchedule', entityId: existing._id });
    return { success: true };
  }
}
