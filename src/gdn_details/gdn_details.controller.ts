import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GdnDetailsService } from './gdn_details.service';
import { CreateGdnDetailDto } from './dto/create-gdn_detail.dto';
import { UpdateGdnDetailDto } from './dto/update-gdn_detail.dto';

@Controller('gdn-details')
export class GdnDetailsController {
  constructor(private readonly gdnDetailsService: GdnDetailsService) {}

  @Post()
  create(@Body() createGdnDetailDto: CreateGdnDetailDto) {
    return this.gdnDetailsService.create(createGdnDetailDto);
  }

  @Get()
  findAll() {
    return this.gdnDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gdnDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGdnDetailDto: UpdateGdnDetailDto) {
    return this.gdnDetailsService.update(+id, updateGdnDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gdnDetailsService.remove(+id);
  }
}
