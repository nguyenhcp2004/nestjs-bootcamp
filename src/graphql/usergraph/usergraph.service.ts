import { Usergraph } from 'src/graphql/usergraph/entities/usergraph.entity'
import { Injectable } from '@nestjs/common'
import { CreateUsergraphDto } from './dto/create-usergraph.input'
import { UpdateUsergraphInput } from './dto/update-usergraph.input'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsergraphService {
  constructor(@InjectModel(Usergraph.name) private userModel: Model<Usergraph>) {}
  create(createUsergraphInput: CreateUsergraphDto) {
    return this.userModel.create(createUsergraphInput)
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
