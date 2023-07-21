import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/:name')
  getSetting(@Param('name') name: string): number {
    const setting = this.settingsService.getSettingValueByName(name);
    if (!setting) throw new NotFoundException('Setting name not found');
    return setting;
  }

  @Patch('/:name/value')
  async setSetting(
    @Param('name') name: string,
    @Body('value') value: number,
  ): Promise<number> {
    return await this.settingsService.setSettingByName(name, value);
  }
}
