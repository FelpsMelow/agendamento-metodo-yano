import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ emailNormalized: email.trim().toLowerCase(), deletedAt: null }).exec();
  }

  async findById(id: string | Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  validateActiveUser(user: UserDocument): void {
    if (!user.isActive) {
      throw new UnauthorizedException('Usuário inativo.');
    }
  }
}
