import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
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
export class AuthorsService {
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

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
