import { Test, TestingModule } from '@nestjs/testing';
import { PassDueFineSettingService } from './pass_due_fine_setting.service';

describe('PassDueFineSettingService', () => {
  let service: PassDueFineSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassDueFineSettingService],
    }).compile();

    service = module.get<PassDueFineSettingService>(PassDueFineSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
