import { IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
  
  @IsString()
  description: string;
}
