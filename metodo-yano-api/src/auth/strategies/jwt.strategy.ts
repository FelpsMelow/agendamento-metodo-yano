import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

export interface JwtPayload {
  sub: string;
  clinicId: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: { cookies?: Record<string, string> }) => request?.cookies?.auth_token,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'metodo-yano-dev-secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    this.usersService.validateActiveUser(user);

    if (String(user.clinicId) !== payload.clinicId) {
      throw new UnauthorizedException('Token inválido para a clínica.');
    }

    return {
      id: String(user._id),
      clinicId: String(user.clinicId),
      name: user.name,
      email: user.email,
      role: user.role,
      isProfessional: user.isProfessional,
    };
  }
}
