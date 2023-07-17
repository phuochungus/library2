import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from '../entities';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import { MaximumAgeSetting } from './maximum_age_setting/maximum_age_setting.service';
import { MinimumAgeSetting } from './minumum_age_setting/minumum_age_setting.service';
import { FeatureSetting } from './feature_setting/feature_setting.service';
import { SettingDispathService } from './setting_dispath_service/setting_dispath_service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [
    {
      provide: Client,
      useFactory: (configService: ConfigService) => {
        const dbURL = configService.get<string>('DATABASE_URL');
        if (!dbURL) throw new Error('db not found');
        return new Client({ connectionString: dbURL });
      },
      inject: [ConfigService],
    },
    SettingsService,
    MinimumAgeSetting,
    MaximumAgeSetting,
    SettingDispathService,
  ],
})
export class SettingsModule {}
