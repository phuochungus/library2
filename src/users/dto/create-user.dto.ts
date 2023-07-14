import { IsDate, IsDateString, IsEmail, IsString } from 'class-validator';
import { Tier, BorrowReceipt, FineReceipt, UserToBook } from '../../entities';
import { User } from '../entities/user.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString({ strict: true })
  birthday: string;

  @IsString()
  address: string;
}
