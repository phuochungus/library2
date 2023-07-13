import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Book, Genre } from '../entities';
import { BasicRepository } from '../abstracts';
import _ from 'lodash';

export abstract class BooksRepostory extends BasicRepository<
  Book,
  CreateBookDto,
  UpdateBookDto
> {}

@Injectable()
export class StandardBooksRepository implements BooksRepostory {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
    private dataSource: DataSource,
  ) {}

  async removeAll(): Promise<void> {
    await this.booksRepository.delete({});
  }

  async create(createBookDto: CreateBookDto): Promise<Book | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const genres: Genre[] = await this.genresRepository.find({
        where: {
          id: In(createBookDto.genreIds),
        },
      });
      if (genres.length != createBookDto.genreIds.length)
        throw new NotFoundException(
          `Not found following genre'Id(s): ${_.difference(
            createBookDto.genreIds,
            genres.map((genre) => genre.id),
          )}`,
        );
      const result = await this.booksRepository.insert(createBookDto);
      return await this.booksRepository.findOne({
        where: result.identifiers[0],
      });
    } catch (error) {
      queryRunner.rollbackTransaction();
      if (error.code) throw new ConflictException('ISBN already existed');
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.booksRepository.find({
        relations: { publisher: true },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(ISBN: string): Promise<Book | null> {
    return await this.booksRepository.findOne({
      where: { ISBN },
      relations: { publisher: true },
    });
  }

  async update(
    ISBN: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    try {
      const result = await this.booksRepository.update({ ISBN }, updateBookDto);
      if (result.affected == 0) return null;
      return await this.booksRepository.findOne({ where: { ISBN } });
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(ISBN: string): Promise<void> {
    try {
      const result = await this.booksRepository.delete({ ISBN });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
