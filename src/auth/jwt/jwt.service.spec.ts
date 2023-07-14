import { Test, TestingModule } from '@nestjs/testing';
import { JWTStrategy } from './jwt.strategy';

describe('JwtService', () => {
  let service: JWTStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JWTStrategy],
    }).compile();

    service = module.get<JWTStrategy>(JWTStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
