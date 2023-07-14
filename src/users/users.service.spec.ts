import { Test, TestingModule } from '@nestjs/testing';
import { StandardUserRepository } from './users.service';

describe('UsersService', () => {
  let service: StandardUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardUserRepository],
    }).compile();

    service = module.get<StandardUserRepository>(StandardUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
