import { Test, TestingModule } from '@nestjs/testing';
import { StandardAuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let service: StandardAuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardAuthorsService],
    }).compile();

    service = module.get<StandardAuthorsService>(StandardAuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
