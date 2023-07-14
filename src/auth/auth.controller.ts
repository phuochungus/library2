import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JWTAuthGuard } from './jwt/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/local')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    return this.jwtService.sign(req.user);
  }

  @Get('/protected')
  @UseGuards(JWTAuthGuard)
  getProtected() {
    return 'protected';
  }
}
