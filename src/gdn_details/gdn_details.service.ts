import { Injectable } from '@nestjs/common';
import { CreateGdnDetailDto } from './dto/create-gdn_detail.dto';
import { UpdateGdnDetailDto } from './dto/update-gdn_detail.dto';
import { GDN, GDNDetail } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GdnDetailsService {
  constructor(
    @InjectRepository(GDNDetail)
    private GDNDetailRepository: Repository<GDNDetail>,
  ) {}

  create(createGdnDetailDto: CreateGdnDetailDto) {}

  findAll() {
    return `This action returns all gdnDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gdnDetail`;
  }

  update(id: number, updateGdnDetailDto: UpdateGdnDetailDto) {
    return `This action updates a #${id} gdnDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} gdnDetail`;
  }
}
