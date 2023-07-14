import { Test, TestingModule } from '@nestjs/testing';
import { StandardAuthorRepository } from './authors.service';

describe('AuthorsService', () => {
  let service: StandardAuthorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardAuthorRepository],
    }).compile();

    service = module.get<StandardAuthorRepository>(StandardAuthorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
