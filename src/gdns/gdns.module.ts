import { Module } from '@nestjs/common';
import { GdnsService } from './gdns.service';
import { GdnsController } from './gdns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, GDN, GDNDetail } from '../entities';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([GDN, Book, GDNDetail]), BooksModule],
  controllers: [GdnsController],
  providers: [GdnsService],
})
export class GdnsModule {}
