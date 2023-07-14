import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreRepository } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreRepository: GenreRepository) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreRepository.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genreRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreRepository.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreRepository.remove(+id);
  }
}
