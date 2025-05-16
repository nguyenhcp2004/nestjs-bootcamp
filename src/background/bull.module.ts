/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigurableModuleClass } from 'src/background/bull.module-definition'
import { BullQueueName, RegisterQueueOptions } from 'src/background/bull.types'
import { BullModule as NestBullModule } from '@nestjs/bullmq'
import { OPTIONS_TYPE } from 'src/background/options/option.module-definition'
import { QueueOptionsModule } from 'src/background/options/options.module'
import { QueueOptionsFactory } from 'src/background/options/option.factory'
import { bullData } from 'src/background/bull.constants'

@Module({})
export class BullModule extends ConfigurableModuleClass {
  // register the queue
  public static registerQueue(options: RegisterQueueOptions = {}): DynamicModule {
    const queueName = options.queueName || BullQueueName.Email
    // register the queue
    const registerQueueDynamicModule = NestBullModule.registerQueue({
      name: bullData[queueName].name,
      prefix: bullData[queueName].prefix
    })
    return {
      global: options.isGlobal,
      module: BullModule,
      imports: [registerQueueDynamicModule],
      exports: [registerQueueDynamicModule]
    }
  }

  // for root
  public static forRoot(options: typeof OPTIONS_TYPE = {}) {
    const dynamicModule = super.forRoot(options)
    return {
      ...dynamicModule,
      imports: [
        NestBullModule.forRootAsync({
          imports: [QueueOptionsModule.register()],
          inject: [QueueOptionsFactory],
          useFactory: (queueOptionsFactory: QueueOptionsFactory) => queueOptionsFactory.createQueueOptions()
        })
      ]
    }
  }
}
