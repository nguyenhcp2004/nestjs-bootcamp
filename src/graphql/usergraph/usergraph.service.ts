import { Usergraph } from 'src/graphql/usergraph/entities/usergraph.entity'
import { Injectable } from '@nestjs/common'
import { CreateUsergraphDto } from './dto/create-usergraph.input'
import { UpdateUsergraphInput } from './dto/update-usergraph.input'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { JwtService } from 'src/jwt/jwt.service'

@Injectable()
export class UsergraphService {
  constructor(
    @InjectModel(Usergraph.name) private userModel: Model<Usergraph>,
    private readonly jwtService: JwtService
  ) {}
  async create(createUsergraphInput: CreateUsergraphDto) {
    const { accessToken, refreshToken } = await this.jwtService.generateAuthCredentials({ userId: 'test01' })
    console.log(accessToken, refreshToken)
    const user = await this.userModel.create(createUsergraphInput)
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  findAll() {
    return `This action returns all usergraph`
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
