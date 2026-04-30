import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ProfessionalsService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async list(clinicId: string) {
    const items = await this.userModel.find({ clinicId, deletedAt: null, isProfessional: true, isActive: true }).sort({ name: 1 }).lean();
    return { items: items.map(({ passwordHash, ...rest }) => rest) };
  }
}
