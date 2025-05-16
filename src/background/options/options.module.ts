import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'
import { QueueOptionsFactory } from 'src/background/options/option.factory'
import { ConfigurableModuleClass, OPTIONS_TYPE } from 'src/background/options/option.module-definition'

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      options: {
        password: 'redis',
        maxRetriesPerRequest: null
      }
    })
  ],
  providers: [QueueOptionsFactory],
  exports: [QueueOptionsFactory]
})
export class QueueOptionsModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE = {}) {
    return super.register(options)
  }
}
