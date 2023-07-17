import { Test, TestingModule } from '@nestjs/testing';
import { FeatureSettingService } from './feature_setting.service';

describe('FeatureSettingService', () => {
  let service: FeatureSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureSettingService],
    }).compile();

    service = module.get<FeatureSettingService>(FeatureSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
