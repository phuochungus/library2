import { Test, TestingModule } from '@nestjs/testing';
import { MaximumAgeSetting } from './maximum_age_setting.service';

describe('MaximumAgeSettingService', () => {
  let service: MaximumAgeSetting;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaximumAgeSetting],
    }).compile();

    service = module.get<MaximumAgeSetting>(MaximumAgeSetting);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
