import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private jwtService: JwtService) {}

  makeToken(object: Object): string {
    return this.jwtService.sign(object);
  }
}
