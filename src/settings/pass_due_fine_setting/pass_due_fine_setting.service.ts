import { Global, Injectable } from '@nestjs/common';
import { FeatureSetting } from '../feature_setting/feature_setting.service';

@Global()
@Injectable()
export class PassDueFineSettingService extends FeatureSetting {
  public readonly defaultFeatureDescription: string = 'fine each day after due';
  public readonly defaultName: string = 'pass_due_fine';
  public readonly defaultValue: number = 1.5;
}
