import { Test, TestingModule } from '@nestjs/testing';
import { StandardPublishersRepository } from './publishers.service';

describe('PublishersService', () => {
  let service: StandardPublishersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardPublishersRepository],
    }).compile();

    service = module.get<StandardPublishersRepository>(StandardPublishersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
