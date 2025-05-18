import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { BullModule } from 'src/background/bull.module'
import { BullQueueName } from 'src/background/bull.types'
import { EmailWorker } from 'src/cron-worker/email/email.worker'

@Module({
  imports: [
    BullModule.registerQueue({
      queueName: BullQueueName.Email
    })
  ],
  providers: [EmailService, EmailWorker],
  exports: [EmailService, EmailWorker]
})
export class EmailQueueModule {}
