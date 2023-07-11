import { Module } from '@nestjs/common';
import {
  AbstractRepository,
  PublishersRepository,
  StandardPublishersRepository,
} from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '../entities/Publisher';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublishersController],
  providers: [
    { provide: PublishersRepository, useClass: StandardPublishersRepository },
  ],
})
export class PublishersModule {}
