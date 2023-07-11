import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PublishersRepository, AbstractRepository } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { isNumberString } from 'class-validator';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersRepository: PublishersRepository) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersRepository.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publishersRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNumberString(id, { no_symbols: true })) {
      const publisher = await this.publishersRepository.findOne(id);
      if (publisher) return publisher;
      throw new NotFoundException('Publisher not found');
    } else throw new BadRequestException('Id must a integer number');
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    if (isNumberString(id, { no_symbols: true }))
      return this.publishersRepository.update(id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNumberString(id, { no_symbols: true }))
      return this.publishersRepository.remove(id);
  }

  // @Post(':id/books')
  // async addBookIntoPublisherList(
  //   @Param('id') id: string,
  //   @Body('ISBN') ISBN: string,
  // ) {
  //   return await this.publishersRepository.(id, ISBN);
  // }
}
