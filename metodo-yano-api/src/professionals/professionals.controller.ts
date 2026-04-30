import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalListResponse } from './types/professional-list-item.type';

type AuthenticatedUser = {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  role: string;
  isProfessional: boolean;
};

@UseGuards(JwtAuthGuard)
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly service: ProfessionalsService) {}

  @Get()
  list(@CurrentUser() user: AuthenticatedUser): Promise<ProfessionalListResponse> {
    return this.service.list(user.clinicId);
  }
}
