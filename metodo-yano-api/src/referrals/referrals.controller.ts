import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ListReferralsDto } from './dto/list-referrals.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { ReferralsService } from './referrals.service';

@UseGuards(JwtAuthGuard)
@Controller('referrals')
export class ReferralsController {
  constructor(private readonly service: ReferralsService) {}

  @Get() list(@CurrentUser() user: any, @Query() query: ListReferralsDto) { return this.service.list(user.clinicId, query); }
  @Post() create(@CurrentUser() user: any, @Body() dto: CreateReferralDto) { return this.service.create(user.clinicId, user.id, dto); }
  @Get(':id') find(@CurrentUser() user: any, @Param('id') id: string) { return this.service.findOne(user.clinicId, id); }
  @Patch(':id') update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateReferralDto) { return this.service.update(user.clinicId, user.id, id, dto); }
  @Delete(':id') remove(@CurrentUser() user: any, @Param('id') id: string) { return this.service.remove(user.clinicId, user.id, id); }
}
