import { Usergraph } from 'src/graphql/usergraph/entities/usergraph.entity'
import { Injectable } from '@nestjs/common'
import { CreateUsergraphDto } from './dto/create-usergraph.input'
import { UpdateUsergraphInput } from './dto/update-usergraph.input'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from 'src/jwt/jwt.service'
import { Queue } from 'bullmq'
import { BullQueueName } from 'src/background/bull.types'
import { InjectQueue } from 'src/background/bull.decorator'
import { JobName } from 'src/background/bull.constants'

@Injectable()
export class UsergraphService {
  constructor(
    @InjectModel(Usergraph.name) private userModel: Model<Usergraph>,
    private readonly jwtService: JwtService,
    @InjectQueue(BullQueueName.Email) private emailQueue: Queue
  ) {}
  async create(createUsergraphInput: CreateUsergraphDto) {
    // const { accessToken, refreshToken } = await this.jwtService.generateAuthCredentials({ userId: 'test01' })
    // console.log(accessToken, refreshToken)
    const user = await this.userModel.create(createUsergraphInput)

    // send email verification
    await this.emailQueue.add(JobName.EMAIL_VERIFICATION, {
      userId: user._id
    })

    return user
  }

  async findAll() {
    return await this.userModel.find()
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  update(id: number, updateUsergraphInput: UpdateUsergraphInput) {
    return `This action updates a #${id} usergraph`
  }

  remove(id: number) {
    return `This action removes a #${id} usergraph`
  }
}
