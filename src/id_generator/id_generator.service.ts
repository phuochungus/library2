import { Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';

export abstract class IdGenerator {
  abstract generate(): string;
}

@Injectable()
export class SnowflakeIdGenerator implements IdGenerator {
  constructor(private snowflakeId: SnowflakeId) {}
  generate(): string {
    return this.snowflakeId.generate().toString();
  }
}
