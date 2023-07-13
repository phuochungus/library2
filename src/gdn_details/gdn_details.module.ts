import { Module } from '@nestjs/common';
import { GdnDetailsService } from './gdn_details.service';
import { GdnDetailsController } from './gdn_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GDNDetail } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([GDNDetail])],
  controllers: [GdnDetailsController],
  providers: [GdnDetailsService],
})
export class GdnDetailsModule {}
