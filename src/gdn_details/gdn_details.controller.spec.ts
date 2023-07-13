import { Test, TestingModule } from '@nestjs/testing';
import { GdnDetailsController } from './gdn_details.controller';
import { GdnDetailsService } from './gdn_details.service';

describe('GdnDetailsController', () => {
  let controller: GdnDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GdnDetailsController],
      providers: [GdnDetailsService],
    }).compile();

    controller = module.get<GdnDetailsController>(GdnDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
