import { Injectable } from '@nestjs/common';
import { CreateGdnDetailDto } from './dto/create-gdn_detail.dto';
import { UpdateGdnDetailDto } from './dto/update-gdn_detail.dto';

@Injectable()
export class GdnDetailsService {
  create(createGdnDetailDto: CreateGdnDetailDto) {
    return 'This action adds a new gdnDetail';
  }

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
