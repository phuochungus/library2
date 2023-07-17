import { Global, Injectable } from '@nestjs/common';
import { FeatureSetting } from '../feature_setting/feature_setting.service';

@Global()
@Injectable()
export class MinimumAgeSetting extends FeatureSetting {
  public readonly defaultFeatureDescription: string =
    'minimun age allowed to register an account';
  public readonly defaultName: string = 'minimun_age';
  public readonly defaultValue: number = 14;
}
