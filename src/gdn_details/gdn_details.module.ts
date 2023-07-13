import { Module } from '@nestjs/common';
import { GdnDetailsService } from './gdn_details.service';
import { GdnDetailsController } from './gdn_details.controller';

@Module({
  controllers: [GdnDetailsController],
  providers: [GdnDetailsService]
})
export class GdnDetailsModule {}
