import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Book, Publisher } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdGenerator } from '../id_generator/id_generator.service';
import { BasicRepository } from '../abstracts';

export abstract class PublisherRepository extends BasicRepository<
  Publisher,
  CreatePublisherDto,
  UpdatePublisherDto
> {
  abstract addBookToPublisher(ISBN: string, id: string): Promise<Book>;
}

@Injectable()
export class StandardPublisherRepository implements PublisherRepository {
  constructor(
    @InjectRepository(Publisher)
    private publisersRespository: Repository<Publisher>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private idGenerator: IdGenerator,
  ) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    try {
      const publisher = this.publisersRespository.create({
        ...createPublisherDto,
        id: this.idGenerator.generate().toString(),
      });
      await this.publisersRespository.insert(publisher);
      return publisher;
    } catch (error) {
      if (error.code) throw new ConflictException('publisher already exist');
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Publisher[]> {
    try {
      return await this.publisersRespository.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: string) {
    return await this.publisersRespository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher | null> {
    try {
      const result = await this.publisersRespository.update(
        { id },
        updatePublisherDto,
      );
      if (result.affected == 0) return null;
      return await this.publisersRespository.findOne({ where: { id } });
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.publisersRespository.softDelete({ id });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }

  async addBookToPublisher(ISBN: string, id: string): Promise<Book> {
    const [book, publisher] = await Promise.all([
      this.booksRepository.findOne({ where: { ISBN } }),
      this.publisersRespository.findOne({ where: { id } }),
    ]);
    if (!book) throw new NotFoundException('Book not found');
    if (!publisher) throw new NotFoundException('Publisher not found');

    book.publisher = publisher;
    await this.booksRepository.save(book);
    return book;
  }
}
