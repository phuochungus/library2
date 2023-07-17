import { Test, TestingModule } from '@nestjs/testing';
import { SettingDispathServiceService } from './setting_dispath_service.service';

describe('SettingDispathServiceService', () => {
  let service: SettingDispathServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingDispathServiceService],
    }).compile();

    service = module.get<SettingDispathServiceService>(SettingDispathServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
