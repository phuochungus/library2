import { Test, TestingModule } from '@nestjs/testing';
import { GdnDetailsService } from './gdn_details.service';

describe('GdnDetailsService', () => {
  let service: GdnDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GdnDetailsService],
    }).compile();

    service = module.get<GdnDetailsService>(GdnDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
