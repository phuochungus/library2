import { Module } from '@nestjs/common';
import { BooksRepostory, StandardBooksRepository } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entities';
import { Author, Genre, Publisher } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Publisher, Author])],
  controllers: [BooksController],
  providers: [{ provide: BooksRepostory, useClass: StandardBooksRepository }],
  exports: [BooksRepostory],
})
export class BooksModule {}
