import { IsISBN, IsInt, IsNumberString, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsISBN()
  ISBN: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  publishedYear: number;

  @IsNumberString({ no_symbols: true })
  publisherId: string;

  @IsNumberString({ no_symbols: true }, { each: true })
  authorIds: string[];

  @IsInt({ each: true })
  genreIds: number[];
}
