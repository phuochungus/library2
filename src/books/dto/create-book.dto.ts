import {
  IsISBN,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  isEmpty,
} from 'class-validator';

export class CreateBookDto {
  @IsISBN()
  ISBN: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(1)
  publishedYear: number;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  publisherId?: string;

  // @ValidateIf((createBookDto: CreateBookDto) =>
  //   isEmpty(createBookDto.publisherId),
  // )
  // @IsString()
  // @IsNotEmpty()
  // publisherName: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true }, { each: true })
  authorIds?: string[];

  // @ValidateIf((createBookDto: CreateBookDto) =>
  //   isEmpty(createBookDto.authorIds),
  // )
  // @IsString({ each: true })
  // authorNames?: string[];

  @IsOptional()
  @IsNumberString({ no_symbols: true }, { each: true })
  genreIds?: string[];

  // @ValidateIf((createBookDto: CreateBookDto) => isEmpty(createBookDto.genreIds))
  // @IsString({ each: true })
  // genreNames?: string[];
}
