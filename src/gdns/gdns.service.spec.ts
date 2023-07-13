import { Test, TestingModule } from '@nestjs/testing';
import { GdnsService } from './gdns.service';

describe('GdnsService', () => {
  let service: GdnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GdnsService],
    }).compile();

    service = module.get<GdnsService>(GdnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
