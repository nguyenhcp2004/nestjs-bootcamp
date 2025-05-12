import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsergraphService } from './usergraph.service'
import { Usergraph } from './entities/usergraph.entity'
import { CreateUsergraphDto } from './dto/create-usergraph.input'
import { UpdateUsergraphInput } from './dto/update-usergraph.input'

@Resolver(() => Usergraph)
export class UsergraphResolver {
  constructor(private readonly usergraphService: UsergraphService) {}

  @Mutation(() => Usergraph)
  createUsergraph(@Args('createUsergraphInput') createUsergraphInput: CreateUsergraphDto) {
    return this.usergraphService.create(createUsergraphInput)
  }

  @Query(() => [Usergraph], { name: 'usergraph' })
  findAll() {
    return this.usergraphService.findAll()
  }

  @Query(() => Usergraph, { name: 'usergraph' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usergraphService.findOne(id)
  }

  @Mutation(() => Usergraph)
  updateUsergraph(@Args('updateUsergraphInput') updateUsergraphInput: UpdateUsergraphInput) {
    return this.usergraphService.update(updateUsergraphInput.id, updateUsergraphInput)
  }

  @Mutation(() => Usergraph)
  removeUsergraph(@Args('id', { type: () => Int }) id: number) {
    return this.usergraphService.remove(id)
  }
}
