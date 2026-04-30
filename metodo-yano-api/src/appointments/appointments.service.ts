import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointment, AppointmentStatus } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ListAppointmentsDto } from './dto/list-appointments.dto';
import { CalendarEventsDto } from './dto/calendar-events.dto';
import { AuditLog } from '../audit/schemas/audit-log.schema';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>, @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>) {}

  private async ensureNoConflict(clinicId: string, professionalId: string, startAt: Date, endAt: Date, excludeId?: string) {
    const filter: any = { clinicId, professionalId, deletedAt: null, status: { $ne: AppointmentStatus.CANCELLED }, startAt: { $lt: endAt }, endAt: { $gt: startAt } };
    if (excludeId) filter._id = { $ne: new Types.ObjectId(excludeId) };
    const conflict = await this.appointmentModel.exists(filter);
    if (conflict) throw new BadRequestException('Este profissional já possui atendimento neste horário.');
  }

  async list(clinicId: string, query: ListAppointmentsDto) {
    const filter: any = { clinicId, deletedAt: null };
    if (query.professionalId) filter.professionalId = query.professionalId;
    if (query.status) filter.status = query.status;
    if (query.start || query.end) filter.startAt = { ...(query.start ? { $gte: new Date(query.start) } : {}), ...(query.end ? { $lte: new Date(query.end) } : {}) };
    const skip = (query.page - 1) * query.limit;
    const [items, total] = await Promise.all([this.appointmentModel.find(filter).sort({ startAt: 1 }).skip(skip).limit(query.limit).populate('patientId', 'name phones').populate('professionalId', 'name').lean(), this.appointmentModel.countDocuments(filter)]);
    return { items, total, page: query.page, limit: query.limit };
  }
  async events(clinicId: string, query: CalendarEventsDto) {
    const filter: any = { clinicId, deletedAt: null, startAt: { $gte: new Date(query.start) }, endAt: { $lte: new Date(query.end) } };
    if (query.professionalId) filter.professionalId = query.professionalId;
    const appointments = await this.appointmentModel.find(filter).populate('patientId', 'name phones').lean();
    return appointments.map((a: any) => ({ id: String(a._id), title: a.patientId?.name ?? 'Paciente', start: a.startAt, end: a.endAt, extendedProps: { patientId: String(a.patientId?._id || a.patientId), patientName: a.patientId?.name ?? '', professionalId: String(a.professionalId), status: a.status, phone: a.patientId?.phones?.mobile1 || a.patientId?.phones?.phone1 || '', notes: a.notes || '' } }));
  }
  async create(clinicId: string, userId: string, dto: CreateAppointmentDto) {
    await this.ensureNoConflict(clinicId, dto.professionalId, new Date(dto.startAt), new Date(dto.endAt));
    const created = await this.appointmentModel.create({ ...dto, clinicId, startAt: new Date(dto.startAt), endAt: new Date(dto.endAt), date: new Date(dto.date), durationMinutes: dto.durationMinutes ?? 30, status: dto.status ?? AppointmentStatus.SCHEDULED, createdBy: userId, updatedBy: userId });
    await this.auditModel.create({ clinicId, userId, action: 'appointment.create', entity: 'appointment', entityId: created._id, after: dto });
    return created;
  }
  async findOne(clinicId: string, id: string) { const item = await this.appointmentModel.findOne({ _id: id, clinicId, deletedAt: null }).lean(); if (!item) throw new NotFoundException('Atendimento não encontrado.'); return item; }
  async update(clinicId: string, userId: string, id: string, dto: UpdateAppointmentDto) {
    const current = await this.appointmentModel.findOne({ _id: id, clinicId, deletedAt: null }); if (!current) throw new NotFoundException('Atendimento não encontrado.');
    const startAt = dto.startAt ? new Date(dto.startAt) : current.startAt; const endAt = dto.endAt ? new Date(dto.endAt) : current.endAt; const profId = dto.professionalId ?? String(current.professionalId);
    await this.ensureNoConflict(clinicId, profId, startAt, endAt, id);
    const updated = await this.appointmentModel.findByIdAndUpdate(id, { ...dto, ...(dto.startAt ? { startAt } : {}), ...(dto.endAt ? { endAt } : {}), ...(dto.date ? { date: new Date(dto.date) } : {}), updatedBy: userId }, { new: true });
    await this.auditModel.create({ clinicId, userId, action: 'appointment.update', entity: 'appointment', entityId: updated!._id, after: dto });
    return updated;
  }
  async cancel(clinicId: string, userId: string, id: string, reason?: string) { const updated = await this.appointmentModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { status: AppointmentStatus.CANCELLED, cancellationReason: reason, updatedBy: userId }, { new: true }); if (!updated) throw new NotFoundException('Atendimento não encontrado.'); await this.auditModel.create({ clinicId, userId, action: 'appointment.cancel', entity: 'appointment', entityId: updated._id, after: { reason } }); return updated; }
  async updateStatus(clinicId: string, userId: string, id: string, status: AppointmentStatus) { const updated = await this.appointmentModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { status, updatedBy: userId }, { new: true }); if (!updated) throw new NotFoundException('Atendimento não encontrado.'); await this.auditModel.create({ clinicId, userId, action: 'appointment.status_change', entity: 'appointment', entityId: updated._id, after: { status } }); return updated; }
  async remove(clinicId: string, userId: string, id: string) { const updated = await this.appointmentModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { deletedAt: new Date(), isActive: false, updatedBy: userId }, { new: true }); if (!updated) throw new NotFoundException('Atendimento não encontrado.'); await this.auditModel.create({ clinicId, userId, action: 'appointment.delete', entity: 'appointment', entityId: updated._id }); return { success: true }; }
}
