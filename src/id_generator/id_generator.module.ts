import { Global, Module } from '@nestjs/common';
import { IdGenerator, SnowflakeIdGenerator } from './id_generator.service';
import SnowflakeId from 'snowflake-id';

@Global()
@Module({
  providers: [
    {
      provide: SnowflakeId,
      useValue: new SnowflakeId({
        mid: process.pid,
        offset: (2023 - 1970) * 31536000 * 1000,
      }),
    },
    {
      provide: IdGenerator,
      useClass: SnowflakeIdGenerator,
    },
  ],
  exports: [IdGenerator],
})
export class IdGeneratorModule {}
