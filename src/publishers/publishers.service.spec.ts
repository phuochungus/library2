import { Test, TestingModule } from '@nestjs/testing';
import { StandardPublisherRepository } from './publishers.service';

describe('PublishersService', () => {
  let service: StandardPublisherRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardPublisherRepository],
    }).compile();

    service = module.get<StandardPublisherRepository>(StandardPublisherRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
