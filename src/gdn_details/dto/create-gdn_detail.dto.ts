import { CreateBookDto } from '../../books/dto/create-book.dto';
import { GDN } from '../../entities';
import { ValidateNested } from 'class-validator';

export class CreateGdnDetailDto {
  @ValidateNested()
  book: CreateBookDto;
  note: GDN;
}
