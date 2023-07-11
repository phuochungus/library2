import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities';
import { AbstractRepository } from '../abstracts';

export abstract class BooksRepostory extends AbstractRepository<
  Book,
  CreateBookDto,
  UpdateBookDto
> {}

@Injectable()
export class StandardBooksRepository implements BooksRepostory {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}
  
  async removeAll(): Promise<void> {
    await this.booksRepository.delete({});
  }

  async create(createBookDto: CreateBookDto): Promise<Book | null> {
    try {
      const result = await this.booksRepository.insert(createBookDto);
      return await this.booksRepository.findOne({
        where: result.identifiers[0],
      });
    } catch (error) {
      if (error.code) throw new ConflictException('ISBN already existed');
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.booksRepository.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(ISBN: string): Promise<Book | null> {
    return await this.booksRepository.findOne({ where: { ISBN } });
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
