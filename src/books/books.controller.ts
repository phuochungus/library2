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
  constructor(private readonly booksService: BooksRepostory) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':ISBN')
  findOne(@Param('ISBN') ISBN: string) {
    return this.booksService.findOne(ISBN);
  }

  @Patch(':ISBN')
  update(@Param('ISBN') ISBN: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(ISBN, updateBookDto);
  }

  @Delete(':ISBN')
  remove(@Param('ISBN') ISBN: string) {
    return this.booksService.remove(ISBN);
  }

  @Delete()
  removeAll() {
    return this.booksService.removeAll();
  }
}
