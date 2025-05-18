import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { bullData, JobName } from 'src/background/bull.constants'
import { BullQueueName } from 'src/background/bull.types'
import { EmailService } from 'src/cron-worker/email/email.service'

@Processor(bullData[BullQueueName.Email].name)
export class EmailWorker extends WorkerHost {
  private readonly logger = new Logger(bullData[BullQueueName.Email].name)
  constructor(private readonly emailQueueService: EmailService) {
    super()
  }
  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`)

    switch (job.name) {
      case JobName.EMAIL_VERIFICATION:
        // eslint-disable-next-line @typescript-eslint/await-thenable
        return await this.emailQueueService.sendEmailVerification()
      default:
        throw new Error(`Unknown job name: ${job.name}`)
    }
  }
}
