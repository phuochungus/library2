import { Test, TestingModule } from '@nestjs/testing';
import { StandardGenreRepository } from './genres.service';

describe('GenresService', () => {
  let service: StandardGenreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardGenreRepository],
    }).compile();

    service = module.get<StandardGenreRepository>(StandardGenreRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
