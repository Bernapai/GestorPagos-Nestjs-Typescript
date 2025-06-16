import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number; // ID del usuario
  name: string; // Nombre del usuario
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JksIJ093jJS', // La clave secreta del JWT
    });
  }

  validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    return { userId: payload.sub, name: payload.name };
  }
}
