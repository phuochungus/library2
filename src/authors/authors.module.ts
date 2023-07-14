import { Module } from '@nestjs/common';
import { AuthorRepository, StandardAuthorRepository } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [{ provide: AuthorRepository, useClass: StandardAuthorRepository }],
})
export class AuthorsModule {}
