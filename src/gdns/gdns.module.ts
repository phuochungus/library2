import { Module } from '@nestjs/common';
import { GdnsService } from './gdns.service';
import { GdnsController } from './gdns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, GDN, GDNDetail } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([GDN, Book, GDNDetail])],
  controllers: [GdnsController],
  providers: [GdnsService],
})
export class GdnsModule {}
