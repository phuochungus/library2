import { Test, TestingModule } from '@nestjs/testing';
import { PublishersController } from './publishers.controller';
import { StandardPublishersRepository } from './publishers.service';

describe('PublishersController', () => {
  let controller: PublishersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishersController],
      providers: [StandardPublishersRepository],
    }).compile();

    controller = module.get<PublishersController>(PublishersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
