import { IsISBN, IsInt, IsString, Min } from 'class-validator';

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

  @IsInt()
  @Min(1)
  publisherId: number;

  @IsInt({ each: true })
  @Min(1, { each: true })
  authorIds: number[];

  @IsInt({ each: true })
  @Min(1, { each: true })
  genreIds: number[];

  @IsInt({ each: true })
  @Min(1, { each: true })
  GRNDetailIds: number[];
}
