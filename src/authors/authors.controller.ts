import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorRepository } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorRepository: AuthorRepository) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorRepository.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorRepository.remove(id);
  }
}
