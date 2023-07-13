import { Module } from '@nestjs/common';
import { AuthorRepository, StandardAuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [{ provide: AuthorRepository, useClass: StandardAuthorsService }],
})
export class AuthorsModule {}
