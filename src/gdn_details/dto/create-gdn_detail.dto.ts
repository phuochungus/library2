import {
  IsInt,
  IsNumber,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { CreateBookDto } from '../../books/dto/create-book.dto';
import { Type } from 'class-transformer';

export class CreateGdnDetailDto {
  @ValidateNested()
  @Type(() => CreateBookDto)
  book: CreateBookDto;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}
