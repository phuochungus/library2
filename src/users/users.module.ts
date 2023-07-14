import { Module } from '@nestjs/common';
import { StandardUserRepository, UserRepository } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier, User } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tier])],
  controllers: [UsersController],
  providers: [{ provide: UserRepository, useClass: StandardUserRepository }],
})
export class UsersModule {}
