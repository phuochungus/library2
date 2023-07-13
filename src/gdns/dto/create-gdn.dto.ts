import { Type } from 'class-transformer';
import { CreateGdnDetailDto } from '../../gdn_details/dto/create-gdn_detail.dto';

export class CreateGdnDto {
  // id: number;
  // createdDate: Date;
  // totalWorth: number;
  // totalQuantity: number;

  @Type(() => CreateGdnDetailDto)
  details: CreateGdnDetailDto[];
}
