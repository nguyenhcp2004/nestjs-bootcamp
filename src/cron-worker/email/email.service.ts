import { Injectable, Logger } from '@nestjs/common'
import { bullData } from 'src/background/bull.constants'
import { BullQueueName } from 'src/background/bull.types'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(bullData[BullQueueName.Email].name)

  constructor() {}

  sendEmailVerification() {
    this.logger.debug(`Sending email verification to user success`)
  }
}
