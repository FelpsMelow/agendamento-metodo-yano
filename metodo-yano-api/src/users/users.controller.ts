import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get() list(@CurrentUser() user: any) { return this.service.list(user.clinicId); }
  @Post() create(@CurrentUser() user: any, @Body() dto: CreateUserDto) { return this.service.create(user.clinicId, user.id, dto); }
  @Get(':id') find(@CurrentUser() user: any, @Param('id') id: string) { return this.service.findOne(user.clinicId, id); }
  @Patch(':id') update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateUserDto) { return this.service.update(user.clinicId, user.id, id, dto); }
  @Delete(':id') remove(@CurrentUser() user: any, @Param('id') id: string) { return this.service.remove(user.clinicId, user.id, id); }
}
