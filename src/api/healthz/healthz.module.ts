import { Module } from '@nestjs/common'
import { HealthzController } from './healthz.controller'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [TerminusModule],
  controllers: [HealthzController]
})
export class HealthzModule {}
