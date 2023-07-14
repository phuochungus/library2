import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      issuer: process.env.ISSUER,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jsonWebTokenOptions: {
        expiresIn: '5m',
      },
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.username };
  }
}
