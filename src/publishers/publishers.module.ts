import { Module } from '@nestjs/common';
import {
  PublishersRepository,
  StandardPublishersRepository,
} from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '../entities/Publisher';
import { Book } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Book])],
  controllers: [PublishersController],
  providers: [
    { provide: PublishersRepository, useClass: StandardPublishersRepository },
  ],
})
export class PublishersModule {}
