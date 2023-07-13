import { BadGatewayException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicRepository } from '../abstracts';
import { IdGenerator } from '../id_generator/id_generator.service';

export abstract class AuthorRepository extends BasicRepository<
  Author,
  CreateAuthorDto,
  UpdateAuthorDto
> {}

@Injectable()
export class StandardAuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    private idGenerator: IdGenerator,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const author = this.authorsRepository.create(createAuthorDto);
      author.id = this.idGenerator.generate();
      await this.authorsRepository.save(author);
      return author;
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw new BadGatewayException();
    }
  }

  async findAll() {
    return await this.authorsRepository.find();
  }

  async findOne(id: string) {
    return await this.authorsRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
      withDeleted: true,
    });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      const result = await this.authorsRepository.update(
        { id },
        updateAuthorDto,
      );
      if (result.affected == 0) return null;
      return await this.authorsRepository.findOne({ where: { id } });
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const book = await this.authorsRepository.findOne({ where: { id } });
      if (!book) throw new NotFoundException();
      await this.authorsRepository.softDelete(book);
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
