import { formatWithBraces } from 'src/background/bull.utils'
import { BullQueueData, BullQueueName } from './bull.types'

export const queueOptions = {
  JOB_AGE: 24 * 3600, // 24 hours
  COMPLETE_JOB_COUNT: 1000, // keep up to 1000 jobs
  FAILED_JOB_COUNT: 5000 // keep up to 1000 jobs
}

export const JobName = {
  EMAIL_VERIFICATION: 'email-verification'
}

export const bullData: Record<BullQueueName, BullQueueData> = {
  [BullQueueName.Email]: {
    name: 'EMAIL_QUEUE',
    batchSize: 10000,
    prefix: formatWithBraces('email'),
    opts: {
      removeOnComplete: {
        age: queueOptions.JOB_AGE,
        count: queueOptions.COMPLETE_JOB_COUNT
      },
      removeOnFail: {
        age: queueOptions.JOB_AGE,
        count: queueOptions.FAILED_JOB_COUNT
      }
    }
  }
}
