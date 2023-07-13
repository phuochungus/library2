import { Test, TestingModule } from '@nestjs/testing';
import { GdnsController } from './gdns.controller';
import { GdnsService } from './gdns.service';

describe('GdnsController', () => {
  let controller: GdnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GdnsController],
      providers: [GdnsService],
    }).compile();

    controller = module.get<GdnsController>(GdnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
