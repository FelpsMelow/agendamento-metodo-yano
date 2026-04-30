import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) { return this.authService.login(dto); }

  @Post('logout')
  logout() { return { success: true }; }

  @Get('me')
  me() { return { id: 'mock', name: 'Usuário', role: 'admin' }; }
}
