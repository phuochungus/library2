import { Test, TestingModule } from '@nestjs/testing';
import { StandardTierRepository } from './tiers.service';

describe('TiersService', () => {
  let service: StandardTierRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardTierRepository],
    }).compile();

    service = module.get<StandardTierRepository>(StandardTierRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
