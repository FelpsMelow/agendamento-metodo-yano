import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ProfessionalListItem, ProfessionalListResponse } from './types/professional-list-item.type';

@Injectable()
export class ProfessionalsService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async list(clinicId: string): Promise<ProfessionalListResponse> {
    const items = await this.userModel
      .find({ clinicId, deletedAt: null, isProfessional: true, isActive: true })
      .sort({ name: 1 })
      .select('_id clinicId name email role isProfessional isActive createdAt updatedAt')
      .lean()
      .exec();

    const serializedItems: ProfessionalListItem[] = items.map((professional) => ({
      _id: String(professional._id),
      clinicId: String(professional.clinicId),
      name: professional.name,
      email: professional.email,
      role: professional.role,
      isProfessional: professional.isProfessional,
      isActive: professional.isActive,
      createdAt: professional.createdAt,
      updatedAt: professional.updatedAt,
    }));

    return { items: serializedItems };
  }
}
