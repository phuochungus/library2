import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksRepostory } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('books')
export class BooksController {
  constructor(private readonly booksRepository: BooksRepostory) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksRepository.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksRepository.findAll();
  }

  @Get(':ISBN')
  findOne(@Param('ISBN') ISBN: string) {
    return this.booksRepository.findOne(ISBN);
  }

  @Patch(':ISBN')
  update(@Param('ISBN') ISBN: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(ISBN, updateBookDto);
  }

  @Delete(':ISBN')
  remove(@Param('ISBN') ISBN: string) {
    return this.booksRepository.remove(ISBN);
  }

  @Delete()
  removeAll() {
    return this.booksRepository.removeAll();
  }
}
