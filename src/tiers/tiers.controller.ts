import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TierRepository } from './tiers.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Controller('tiers')
export class TiersController {
  constructor(private readonly tierRepository: TierRepository) {}

  @Post()
  create(@Body() createTierDto: CreateTierDto) {
    return this.tierRepository.create(createTierDto);
  }

  @Get()
  findAll() {
    return this.tierRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tierRepository.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTierDto: UpdateTierDto) {
    return this.tierRepository.update(id, updateTierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tierRepository.remove(id);
  }
}
