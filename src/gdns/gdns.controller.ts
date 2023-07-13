import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { GdnsService } from './gdns.service';
import { CreateGdnDto } from './dto/create-gdn.dto';

@Controller('gdns')
export class GdnsController {
  constructor(private readonly gdnsService: GdnsService) {}

  @Post()
  create(@Body() createGdnDto: CreateGdnDto) {
    return this.gdnsService.create(createGdnDto);
  }

  @Get()
  findAll() {
    return this.gdnsService.findAll();
  }
}
