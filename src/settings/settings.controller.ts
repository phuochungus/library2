import {
  Controller,
} from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // @Post()
  // create(@Body() createSettingDto: CreateSettingDto) {
  //   return this.settingsService.create(createSettingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.settingsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.settingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
  //   return this.settingsService.update(+id, updateSettingDto);
  // }
}
