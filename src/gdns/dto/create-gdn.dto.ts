import { Type } from 'class-transformer';
import { CreateGdnDetailDto } from '../../gdn_details/dto/create-gdn_detail.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class CreateGdnDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateGdnDetailDto)
  details: CreateGdnDetailDto[];
}
