import { Module } from '@nestjs/common';
import { GenreRepository, StandardGenreRepository } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [{ provide: GenreRepository, useClass: StandardGenreRepository }],
})
export class GenresModule {}
