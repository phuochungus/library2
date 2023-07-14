import { Module } from '@nestjs/common';
import {
  PublisherRepository,
  StandardPublisherRepository,
} from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entitiy';
import { Book } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Book])],
  controllers: [PublishersController],
  providers: [
    { provide: PublisherRepository, useClass: StandardPublisherRepository },
  ],
})
export class PublishersModule {}
