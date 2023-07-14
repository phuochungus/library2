import { Module } from '@nestjs/common';
import { StandardTierRepository, TierRepository } from './tiers.service';
import { TiersController } from './tiers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Tier])],
  controllers: [TiersController],
  providers: [{ provide: TierRepository, useClass: StandardTierRepository }],
})
export class TiersModule {}
