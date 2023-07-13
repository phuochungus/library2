import { Injectable } from '@nestjs/common';
import { CreateGdnDto } from './dto/create-gdn.dto';
import { UpdateGdnDto } from './dto/update-gdn.dto';
import { BasicRepository } from '../abstracts';
import { GDN } from '../entities/GDN';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private gdnDetailsRepository: Repository<GDNDetail>,
  ) {}
  
  create(createDto: CreateGdnDto): Promise<GDN | null> {
    throw new Error('Method not implemented.');
    
  }
  findAll(): Promise<GDN[]> {
    throw new Error('Method not implemented.');
  }
  findOne(identifier: any): Promise<GDN | null> {
    throw new Error('Method not implemented.');
  }
  update(identifier: any, updateDto: UpdateGdnDto): Promise<GDN | null> {
    throw new Error('Method not implemented.');
  }
  remove(identifier: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
