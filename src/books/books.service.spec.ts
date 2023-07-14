import { Test, TestingModule } from '@nestjs/testing';
import { StandardBookRepository } from './books.service';

describe('BooksService', () => {
  let service: StandardBookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardBookRepository],
    }).compile();

    service = module.get<StandardBookRepository>(StandardBookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
