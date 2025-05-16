import { BulkJobOptions } from 'bullmq'

export enum BullQueueName {
  Email = 'email'
}

export interface BullQueueData {
  name: string
  batchSize: number
  prefix?: string
  opts?: BulkJobOptions
}

export interface RegisterQueueOptions {
  queueName?: BullQueueName
  isGlobal?: boolean
}
