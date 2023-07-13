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
import { Author, Book, Genre, Publisher } from '../entities';
import { BasicRepository } from '../abstracts';
import { difference } from 'lodash';

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
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    private dataSource: DataSource,
  ) {}

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
        throw new NotFoundException({
          messaege: 'Not found genre with following id(s)',
          ids: difference(
            createBookDto.genreIds,
            genres.map((genre) => genre.id),
          ),
        });

      const publisher = await this.publishersRepository.findOne({
        where: { id: createBookDto.publisherId },
      });
      if (!publisher)
        throw new NotFoundException({
          message: 'Not found publisher with following id(s)',
          ids: createBookDto.publisherId,
        });

      const authors = await this.authorsRepository.find({
        where: {
          id: In(createBookDto.authorIds),
        },
      });

      if (authors.length != createBookDto.authorIds.length)
        throw new NotFoundException({
          message: 'Not found author with following id(s)',
          ids: difference(
            createBookDto.authorIds,
            authors.map((author) => author.id),
          ),
        });

      const createdBook = this.booksRepository.create(createBookDto);
      createdBook.genres = genres;
      createdBook.publisher = publisher;
      createdBook.authors = authors;
      await this.booksRepository.insert(createdBook);
      return createdBook;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code == '23505')
        throw new ConflictException('ISBN already existed');
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.booksRepository.find({
        relations: { publisher: true, authors: true, genres: true },
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
      withDeleted: true,
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
      const book = await this.booksRepository.findOne({ where: { ISBN } });
      if (!book) throw new NotFoundException();
      await this.booksRepository.softDelete(book);
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
