import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuditLog } from '../audit/schemas/audit-log.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLog>,
  ) {}

  private sanitize(user: any) { const { passwordHash, ...safe } = user; return safe; }
  private normalizedEmail(email: string) { return email.trim().toLowerCase(); }

  async list(clinicId: string) {
    const items = await this.userModel.find({ clinicId, deletedAt: null }).sort({ name: 1 }).lean();
    return { items: items.map((i) => this.sanitize(i)) };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ emailNormalized: this.normalizedEmail(email), deletedAt: null }).exec();
  }

  async create(clinicId: string, userId: string, dto: CreateUserDto) {
    const emailNormalized = this.normalizedEmail(dto.email);
    const exists = await this.userModel.exists({ clinicId, emailNormalized, deletedAt: null });
    if (exists) throw new BadRequestException('E-mail já cadastrado neste consultório.');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const created = await this.userModel.create({ ...dto, clinicId, emailNormalized, passwordHash, isProfessional: dto.isProfessional ?? false, isActive: dto.isActive ?? true });
    await this.auditModel.create({ clinicId, userId, action: 'user.create', entity: 'user', entityId: created._id, after: { ...dto, password: undefined } });
    return this.sanitize(created.toObject());
  }

  async findOne(clinicId: string, id: string) {
    const user = await this.userModel.findOne({ _id: id, clinicId, deletedAt: null }).lean();
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return this.sanitize(user);
  }

  async findById(id: string | Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async update(clinicId: string, userId: string, id: string, dto: UpdateUserDto) {
    const current = await this.userModel.findOne({ _id: id, clinicId, deletedAt: null });
    if (!current) throw new NotFoundException('Usuário não encontrado.');

    const payload: any = { ...dto };
    if (dto.email) {
      const emailNormalized = this.normalizedEmail(dto.email);
      const exists = await this.userModel.exists({ _id: { $ne: id }, clinicId, emailNormalized, deletedAt: null });
      if (exists) throw new BadRequestException('E-mail já cadastrado neste consultório.');
      payload.emailNormalized = emailNormalized;
    }
    if (dto.password) payload.passwordHash = await bcrypt.hash(dto.password, 10);
    delete payload.password;

    const updated = await this.userModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, payload, { new: true }).lean();
    await this.auditModel.create({ clinicId, userId, action: 'user.update', entity: 'user', entityId: current._id, before: this.sanitize(current.toObject()), after: { ...dto, password: undefined } });
    return this.sanitize(updated);
  }

  async remove(clinicId: string, userId: string, id: string) {
    const deleted = await this.userModel.findOneAndUpdate({ _id: id, clinicId, deletedAt: null }, { deletedAt: new Date(), isActive: false }, { new: true });
    if (!deleted) throw new NotFoundException('Usuário não encontrado.');
    await this.auditModel.create({ clinicId, userId, action: 'user.delete', entity: 'user', entityId: deleted._id, before: this.sanitize(deleted.toObject()) });
    return { success: true };
  }

  validateActiveUser(user: UserDocument): void {
    if (!user.isActive) throw new UnauthorizedException('Usuário inativo.');
  }
}
