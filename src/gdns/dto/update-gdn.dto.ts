import { PartialType } from '@nestjs/swagger';
import { CreateGdnDto } from './create-gdn.dto';

export class UpdateGdnDto extends PartialType(CreateGdnDto) {}
