import { Module } from '@nestjs/common'
import { BullModule } from 'src/background/bull.module'
import { EmailQueueModule } from 'src/cron-worker/email/email.module'

@Module({
  imports: [EmailQueueModule, BullModule.forRoot()],
  exports: [EmailQueueModule]
})
export class AppModule {}
