import { Module } from '@nestjs/common';
import { BooksRepostory, StandardBooksRepository } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [{ provide: BooksRepostory, useClass: StandardBooksRepository }],
  exports: [BooksRepostory],
})
export class BooksModule {}
