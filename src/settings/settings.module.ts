import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from '../entities';
import { MinimumAgeSetting } from './feature_setting';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    MinimumAgeSetting,
    {
      provide: Client,
      useFactory: (configService: ConfigService) => {
        const dbURL = configService.get<string>('DATABASE_URL');
        if (!dbURL) throw new Error('db not found');
        return new Client({ connectionString: dbURL });
      },
      inject: [ConfigService],
    },
  ],
})
export class SettingsModule {}
