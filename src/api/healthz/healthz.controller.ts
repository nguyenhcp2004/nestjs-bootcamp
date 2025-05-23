import { RedisHealthIndicator } from '@nestjs-modules/ioredis'
import { Controller, Get, Header } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'
import { Gauge, register } from 'prom-client'
@Controller('healthz')
export class HealthzController {
  private gauge: Gauge<string>
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private typeorm: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator
  ) {
    this.gauge = new Gauge({
      name: 'random_value',
      help: 'Random value every second'
    })
  }

  @Get()
  // @HealthCheck()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  check() {
    console.log('called by prometheus')
    const randomValue = Math.random() * 100
    this.gauge.set(randomValue)
    return register.metrics()
    // return this.health.check([
    // () => this.mongoose.pingCheck('mongo'),
    // () => this.typeorm.pingCheck('postgres')
    // () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    // () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    // () => this.disk.checkStorage('disk', { thresholdPercent: 0.8, path: '/mnt/c' })
    //   ])
  }
}
