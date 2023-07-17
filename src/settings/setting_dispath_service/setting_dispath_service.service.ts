import { Injectable } from '@nestjs/common';
import { FeatureSetting } from '../feature_setting/feature_setting.service';

@Injectable()
export class SettingDispathService {
  public settings: FeatureSetting[] = [];

  dispatch(id: string, value: number) {
    for (let index = 0; index < this.settings.length; index++) {
      if (this.settings[index].id == id) {
        this.settings[index].setValue(value);
      }
    }
  }
}
