import { Module } from '@nestjs/common'
import { EventGateway } from 'src/ws/event.gateway'

@Module({
  providers: [EventGateway]
})
export class EventModule {}
