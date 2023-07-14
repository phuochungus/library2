import { IsString } from 'class-validator';

export class CreateTierDto {
  @IsString()
  name: string;
}
