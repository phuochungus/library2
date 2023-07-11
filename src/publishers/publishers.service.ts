import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdGenerator } from '../id_generator/id_generator.service';
import { AbstractRepository } from '../abstracts';

export abstract class PublishersRepository extends AbstractRepository<
  Publisher,
  CreatePublisherDto,
  UpdatePublisherDto
> {}

@Injectable()
export class StandardPublishersRepository implements PublishersRepository {
  constructor(
    @InjectRepository(Publisher)
    private publisersRespository: Repository<Publisher>,
    private idGenerator: IdGenerator,
  ) {}

  removeAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher | null> {
    try {
      const publisher = this.publisersRespository.create({
        ...createPublisherDto,
        id: this.idGenerator.generate().toString(),
      });
      const result = await this.publisersRespository.insert(publisher);
      return await this.publisersRespository.findOne({
        where: result.identifiers[0],
      });
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
      const result = await this.publisersRespository.delete({ id });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }

  async addBookIntoPublisher(ISBN: string, publisherId: string) {}
}
