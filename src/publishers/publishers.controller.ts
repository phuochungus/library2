import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PublisherRepository } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { isNumberString } from 'class-validator';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherRepository.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNumberString(id, { no_symbols: true })) {
      const publisher = await this.publisherRepository.findOne(id);
      if (publisher) return publisher;
      throw new NotFoundException('Publisher not found');
    } else throw new BadRequestException('Id must a integer number');
  }

  @Post(':id/books')
  async addBookIntoPublisherList(
    @Param('id') id: string,
    @Body('ISBN') ISBN: string,
  ) {
    if (ISBN)
      return await this.publisherRepository.addBookToPublisher(ISBN, id);
    else throw new BadRequestException('ISBN must not be empty');
  }
}
