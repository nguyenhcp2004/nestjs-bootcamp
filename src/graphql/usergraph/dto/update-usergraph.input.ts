import { CreateUsergraphDto } from './create-usergraph.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUsergraphInput extends PartialType(CreateUsergraphDto) {
  @Field(() => Int)
  id: number
}
