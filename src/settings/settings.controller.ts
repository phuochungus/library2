import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { set } from 'lodash';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/:name')
  getSetting(@Param('name') name: string): number {
    const setting = this.settingsService.getSettingByName(name);
    if (!setting) throw new NotFoundException('Setting name not found');
    return setting;
  }
}
