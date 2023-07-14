import {
  BadGatewayException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicRepository } from '../abstracts';

export abstract class GenreRepository extends BasicRepository<
  Genre,
  CreateGenreDto,
  UpdateGenreDto
> {
  abstract update(
    identifier: any,
    updateDto: UpdateGenreDto,
  ): Promise<Genre | null>;
  abstract remove(identifier: any): Promise<void>;
}
@Injectable()
export class StandardGenreRepository implements GenreRepository {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      const genre = this.genresRepository.create(createGenreDto);
      await this.genresRepository.save(genre);
      return genre;
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw new BadGatewayException();
    }
  }

  async findAll() {
    return await this.genresRepository.find();
  }

  async findOne(id: number) {
    return await this.genresRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      const result = await this.genresRepository.update({ id }, updateGenreDto);
      if (result.affected == 0) return null;
      return await this.genresRepository.findOne({ where: { id } });
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.genresRepository.softDelete({ id });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
