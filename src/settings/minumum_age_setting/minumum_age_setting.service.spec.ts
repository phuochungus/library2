import { Test, TestingModule } from '@nestjs/testing';
import { MinimumAgeSetting } from './minumum_age_setting.service';

describe('MinumumAgeSettingService', () => {
  let service: MinimumAgeSetting;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinimumAgeSetting],
    }).compile();

    service = module.get<MinimumAgeSetting>(MinimumAgeSetting);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
