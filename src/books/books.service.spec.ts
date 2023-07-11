import { Test, TestingModule } from '@nestjs/testing';
import { StandardBooksRepository } from './books.service';

describe('BooksService', () => {
  let service: StandardBooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardBooksRepository],
    }).compile();

    service = module.get<StandardBooksRepository>(StandardBooksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
