import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
import { CreateGdnDto } from './dto/create-gdn.dto';
import { UpdateGdnDto } from './dto/update-gdn.dto';
import { BasicRepository } from '../abstracts';
import { GDN } from './entities/gdn.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BooksRepostory } from '../books/books.service';
import { IdGenerator } from '../id_generator/id_generator.service';
import { Book, GDNDetail } from '../entities';

export abstract class GDNsRepository extends BasicRepository<
  GDN,
  CreateGdnDto,
  UpdateGdnDto
> {}

@Injectable()
export class GdnsService implements GDNsRepository {
  constructor(
    @InjectRepository(GDN)
    private GDNsRepository: Repository<GDN>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(GDNDetail)
    private GDNDetailsRepository: Repository<GDNDetail>,
    private dataSource: DataSource,
    private bookRepository: BooksRepostory,
    private idGenerator: IdGenerator,
  ) {}

  async create(createDto: CreateGdnDto): Promise<GDN> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const GDN = this.GDNsRepository.create();
      GDN.totalQuantity = 0;
      GDN.totalWorth = 0;
      GDN.id = this.idGenerator.generate();
      GDN.details = [];
      for (let detail of createDto.details) {
        GDN.totalQuantity += detail.quantity;
        GDN.totalWorth += detail.price * detail.quantity;
        const book = await this.booksRepository.findOne({
          where: { ISBN: detail.book.ISBN },
          withDeleted: true,
        });
        const GDNDetail = this.GDNDetailsRepository.create();
        GDNDetail.id = this.idGenerator.generate();
        GDNDetail.price = detail.price;
        GDNDetail.quantity = detail.quantity;
        if (book) {
          book.quantity += detail.quantity;
          await this.booksRepository.save(book);
          GDNDetail.book = book;
        } else {
          const createdBook = await this.bookRepository.create(detail.book);
          GDNDetail.book = createdBook;
        }
        GDN.details.push(GDNDetail);
      }

      await this.GDNsRepository.save(GDN);
      await queryRunner.commitTransaction();
      return GDN;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (!(error instanceof HttpException)) console.error(error);
      throw new BadGatewayException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<GDN[]> {
    return await this.GDNsRepository.find({
      relations: {
        details: true,
      },
    });
  }
  async findOne(id: string): Promise<GDN | null> {
    try {
      return await this.GDNsRepository.findOne({
        where: {
          id,
        },
        relations: {
          details: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }
}
