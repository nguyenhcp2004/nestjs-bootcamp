import { InjectRedis } from '@nestjs-modules/ioredis'
import { Injectable } from '@nestjs/common'
import { QueueOptions } from 'bullmq'
import Redis from 'ioredis'

@Injectable()
export class QueueOptionsFactory {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public createQueueOptions(): QueueOptions {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      connection: this.redis
    }
  }
}
