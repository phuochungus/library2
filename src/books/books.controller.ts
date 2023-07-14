import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { BookRepostory } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('book')
@Controller('books')
export class BooksController {
  constructor(private readonly bookRepository: BookRepostory) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookRepository.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookRepository.findAll();
  }

  @Get(':ISBN')
  findOne(@Param('ISBN') ISBN: string) {
    return this.bookRepository.findOne(ISBN);
  }

  @Patch(':ISBN')
  update(@Param('ISBN') ISBN: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(ISBN, updateBookDto);
  }

  @Delete(':ISBN')
  remove(@Param('ISBN') ISBN: string) {
    return this.bookRepository.remove(ISBN);
  }

  @Post(':ISBN/genres')
  addGenresToBook() {
    return;
  }
}
