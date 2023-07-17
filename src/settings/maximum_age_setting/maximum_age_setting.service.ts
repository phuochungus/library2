import { Global, Injectable } from '@nestjs/common';
import { FeatureSetting } from '../feature_setting/feature_setting.service';

@Global()
@Injectable()
export class MaximumAgeSetting extends FeatureSetting {
  public readonly defaultFeatureDescription: string =
    'maximum age allowed to register an account';
  public readonly defaultName: string = 'maximum_age';
  public readonly defaultValue: number = 200;
}
