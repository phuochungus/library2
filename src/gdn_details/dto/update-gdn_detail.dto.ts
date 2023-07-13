import { PartialType } from '@nestjs/swagger';
import { CreateGdnDetailDto } from './create-gdn_detail.dto';

export class UpdateGdnDetailDto extends PartialType(CreateGdnDetailDto) {}
