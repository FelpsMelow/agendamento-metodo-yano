import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(dto: LoginDto) {
    if (!dto.email || !dto.password) throw new UnauthorizedException('E-mail ou senha inválidos.');
    return { token: 'jwt-token', user: { id: '1', name: 'Admin', email: dto.email } };
  }
}
